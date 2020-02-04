package com.dxc.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.dxc.model.Customer;
import com.dxc.model.Order;
import com.dxc.service.SendEmailTLS;
import com.mongodb.WriteResult;
import com.mongodb.client.result.UpdateResult;

@Repository
public class OrderDAOImpl implements OrderDAO {

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	CustomerDAO customerDAO;

	Order order = new Order();

	@Override
	public List<Order> getAllOrder_for_a_customer(String custUsername) {
		Customer customer = new Customer();
		customer = customerDAO.getCustomerByUsername(custUsername);
		List<Order> allOrder = customer.getOrder();
		System.out.println(allOrder);

		return allOrder;
	}

	@Override
	public boolean addOrder(String custUsername, Order order) {
		Customer customer = new Customer();

		customer = customerDAO.getCustomerByUsername(custUsername);

		List<Order> allOrder = customer.getOrder();

		// For auto incrementing the order Id
		ArrayList<Integer> all_Id = new ArrayList<Integer>();
		for (Order order3 : allOrder) {
			all_Id.add(order3.getOrderId());
		}
		List<Integer> sortedList = all_Id.stream().sorted().collect(Collectors.toList());
		int size = sortedList.size();
		int count = 0;
		if (size == 0) {
			count = 0;
		} else {
			count = sortedList.get(size - 1);
		}

		order.setOrderId(count + 1);

		order.setOrderStatus("OrderPlaced");
		allOrder.add(order);
		customer.setOrder(allOrder);
		System.out.println("Inside DAO :" + order);
		System.out.println("Inside DAO :" + order);
		order.setFeedback(" ");
		mongoTemplate.save(customer, "customer");
		return true;
	}



	@Override
	public boolean updateOrder(String custUsername, int orderId, Order order1) {

		Customer customer = new Customer();
		customer = customerDAO.getCustomerByUsername(custUsername);
		List<Order> allOrder = customer.getOrder();
		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(custUsername).and("order._id").is(orderId));
		Order order2 = getOrder(custUsername, orderId);
		order1.setOrderId(order2.getOrderId());
		order1.setFeedback(order2.getFeedback());

		Update update1 = new Update().set("order.$", order1);

		WriteResult updateResult = mongoTemplate.updateFirst(query, update1, Customer.class);
		System.out.println(updateResult);
		int rowsAffected = (int) updateResult.getN();
		Date date = new Date();
		if (order1.getOrderStatus().equals("Delivered") || order1.getOrderStatus().equals("PickedUp")) {

			// Sending mail after status is Updated............
			SendEmailTLS emailTLS = new SendEmailTLS();
			emailTLS.sendEmail("Order "+ order1.getOrderStatus() +"with OrderId: " + order1.getOrderId() + " \n\n",
					"Your order is " + order1.getOrderStatus() + " on "+ date, customer);
		}
		
		if (rowsAffected == 0)
			return false;
		else
			return true;

	}

	@Override
	public boolean deleteOrder(String custUsername, int orderId) {
		Customer customer = new Customer();
		customer = customerDAO.getCustomerByUsername(custUsername);
		List<Order> allOrder = customer.getOrder();

		System.out.println(allOrder);

		for (int i = 0; i < allOrder.size(); i++) {
			if (allOrder.get(i).getOrderId() == orderId) {
				allOrder.remove(i);
			}
		}

		customer.setOrder(allOrder);
		mongoTemplate.save(customer, "customer");
		return true;
	}

	@Override
	public Order getOrder(String custUsername, int orderId) {
		Customer customer = new Customer();
		Order order = new Order();
		customer = customerDAO.getCustomerByUsername(custUsername);

		for (Order ORDER : customer.getOrder()) {
			if (ORDER.getOrderId() == orderId) {
				order = ORDER;
			}
		}
		System.out.println(order);
		return order;
	}

	@Override
	public List<Customer> getOrderByStatus(String orderStatus2) {

		List<Customer> allOrderByStatus = new ArrayList<Customer>();

		for (Customer customer2 : customerDAO.getAllCustomers()) {

			for (Order order3 : customer2.getOrder()) {
				System.out.print(order3.getOrderStatus() + " ");
				System.out.println(orderStatus2);
				if (order3.getOrderStatus().equals(orderStatus2)) {

					System.out.println("\n");
					System.out.println(orderStatus2);
					System.out.println(order3.getOrderStatus());

					allOrderByStatus.add(customer2);
					break;
				}
			}
		}
		System.out.println(allOrderByStatus);
		return allOrderByStatus;

	}

	@Override
	public boolean updateOrderStatus() {

		return false;
	}

	// for admin side
	@Override
	public List<Customer> getAll_Order_For_All_Customer_Except_Delivered() {

		List<Customer> allOrderByStatus = new ArrayList<Customer>();
		List<Order> allOrder = new ArrayList<Order>();
		String orderStatus = "Delivered";

		for (Customer customer2 : customerDAO.getAllCustomers()) {
			allOrder = new ArrayList<Order>();
			for (Order order3 : customer2.getOrder()) {

				if (!("Delivered".equals(order3.getOrderStatus()))) {

					allOrder.add(order3);

				}

				customer2.setOrder(allOrder);

			}
			System.out.println(allOrder);
			if (!customer2.getOrder().isEmpty()) {
				allOrderByStatus.add(customer2);
			}

		}

		System.out.println(allOrderByStatus);
		return allOrderByStatus;

	}

	@Override
	public List<Customer> getAll_Order_For_All_Customer_Only_Delivered() {

		List<Customer> allOrderByStatus = new ArrayList<Customer>();
		List<Order> allOrder = new ArrayList<Order>();
		String orderStatus = "Delivered";

		for (Customer customer2 : customerDAO.getAllCustomers()) {
			allOrder = new ArrayList<Order>();
			for (Order order3 : customer2.getOrder()) {

				if ("Delivered".equals(order3.getOrderStatus())) {

					allOrder.add(order3);

				}

				customer2.setOrder(allOrder);

			}
			System.out.println(allOrder);
			if (!customer2.getOrder().isEmpty()) {
				allOrderByStatus.add(customer2);
			}

		}

		System.out.println(allOrderByStatus);
		return allOrderByStatus;

	}

	// for Customer side
	@Override
	public List<Order> getAll_Order_For_a_Customer_Except_Delivered(String custUsername) {

		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(custUsername));
		Customer customer = mongoTemplate.findOne(query, Customer.class, "customer");
		String orderStatus = "Delivered";
		List<Order> allOrderByStatus = new ArrayList<Order>();

		for (Order order3 : customer.getOrder()) {

			if (!("Delivered".equals(order3.getOrderStatus()))) {

				System.out.println("_____________________");
				allOrderByStatus.add(order3);

			}
		}

		System.out.println(allOrderByStatus);
		return allOrderByStatus;

	}

	@Override
	public List<Order> getAll_Order_For_a_Customer_Only_Delivered(String custUsername) {

		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(custUsername));
		Customer customer = mongoTemplate.findOne(query, Customer.class, "customer");
		// String orderStatus = "Delivered";
		List<Order> allOrderByStatus = new ArrayList<Order>();

		for (Order order4 : customer.getOrder()) {

			System.out.println(order4.getOrderStatus());

			if ("Delivered".equals(order4.getOrderStatus())) {

				allOrderByStatus.add(order4);
				System.out.println("+++++++++++++++++++++++");

			}

			System.out.println(allOrderByStatus);
		}

		return allOrderByStatus;
	}

	// for deliver side
	@Override
	public List<Customer> getAll_Order_For_All_Customer_Out_For_Deliver() {

		List<Customer> allOrderByStatus = new ArrayList<Customer>();
		List<Order> allOrder = new ArrayList<Order>();
		String orderStatus = "OutForDelivery";

		for (Customer customer2 : customerDAO.getAllCustomers()) {
			allOrder = new ArrayList<Order>();
			for (Order order3 : customer2.getOrder()) {

				if ("OutForDelivery".equals(order3.getOrderStatus())) {

					allOrder.add(order3);

				}
				
				
				
				
				
				
				

				customer2.setOrder(allOrder);

			}
			System.out.println(allOrder);
			if (!customer2.getOrder().isEmpty()) {
				allOrderByStatus.add(customer2);
			}

		}

		System.out.println(allOrderByStatus);
		
		
		
		
		return allOrderByStatus;

	}

	@Override
	public List<Customer> getAll_Order_For_All_Customer_Out_For_PickUp() {

		List<Customer> allOrderByStatus = new ArrayList<Customer>();
		List<Order> allOrder = new ArrayList<Order>();
		String orderStatus = "OutForPickup";

		for (Customer customer2 : customerDAO.getAllCustomers()) {
			allOrder = new ArrayList<Order>();
			for (Order order3 : customer2.getOrder()) {

				if ("OutForPickup".equals(order3.getOrderStatus())) {

					allOrder.add(order3);

				}

				customer2.setOrder(allOrder);

			}
			System.out.println(allOrder);
			if (!customer2.getOrder().isEmpty()) {
				allOrderByStatus.add(customer2);
			}

		}

		System.out.println(allOrderByStatus);
		return allOrderByStatus;

	}

	@Override
	public boolean addFeedback(String custUsername, int orderId, Order order1) {

		Customer customer = new Customer();
		customer = customerDAO.getCustomerByUsername(custUsername);

		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(custUsername).and("order._id").is(orderId));
		Order order2 = getOrder(custUsername, orderId);
		order1.setOrderId(order2.getOrderId());
		order1.setOrderStatus(order2.getOrderStatus());
		order1.setTypeOfService(order2.getTypeOfService());
		System.out.println(order2.getQuantity());
		order1.setQuantity(order2.getQuantity());
		Update update = new Update().set("order.$", order1);

		WriteResult updateResult = mongoTemplate.updateFirst(query, update, Customer.class);
		System.out.println(updateResult);
		int rowsAffected = (int) updateResult.getN();
		if (rowsAffected == 0)
			return false;
		else
			return true;
	}

}
