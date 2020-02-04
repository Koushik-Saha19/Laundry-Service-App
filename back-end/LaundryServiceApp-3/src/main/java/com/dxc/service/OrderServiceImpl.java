package com.dxc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dxc.dao.CustomerDAO;
import com.dxc.dao.OrderDAO;
import com.dxc.model.Customer;
import com.dxc.model.Order;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderDAO orderDAO;
	@Autowired
	CustomerDAO customerDAO;
	
	@Override
	public List<Order> getAllOrder_for_a_customer(String custUsername) {
		
		return orderDAO.getAllOrder_for_a_customer(custUsername);
	}

	@Override
	public boolean addOrder(String custUsername, Order order) {
		
		boolean result = false;
		result = orderDAO.addOrder(custUsername, order);
		if(result)
		{
			SendEmailTLS emailTLS = new SendEmailTLS();
			Customer customer = customerDAO.getCustomerByUsername(custUsername);
			
			emailTLS.sendEmail("Order with OrderId: "+order.getOrderId()+" is placed successfully","Order Type of Service is: "+order.getTypeOfService()+" and Order Quantity is: "+order.getQuantity(), customer);
			
			return true;
		}
		else
		{
			return false;
		}
		
		//return orderDAO.addOrder(custUsername, order);
	}


	@Override
	public boolean updateOrder(String custUsername,int orderId, Order Order) {
		
		return orderDAO.updateOrder(custUsername,orderId,Order);
	}

	@Override
	public boolean deleteOrder(String custUsername, int orderId) {
		
		return orderDAO.deleteOrder(custUsername, orderId);
	}

	@Override
	public Order getOrder(String custUsername, int orderId) {
		
		return orderDAO.getOrder(custUsername, orderId);
	}

	@Override
	public List<Customer> getOrderByStatus(String orderStatus) {
		
		return orderDAO.getOrderByStatus(orderStatus);
	}

	@Override
	public List<Customer> getAll_Order_For_All_Customer_Except_Delivered() {
		
		return orderDAO.getAll_Order_For_All_Customer_Except_Delivered();
	}

	@Override
	public List<Customer> getAll_Order_For_All_Customer_Only_Delivered() {
		
		return orderDAO.getAll_Order_For_All_Customer_Only_Delivered();
	}

	@Override
	public List<Order> getAll_Order_For_a_Customer_Except_Delivered(String custUsername) {
		
		return orderDAO.getAll_Order_For_a_Customer_Except_Delivered(custUsername);
	}

	@Override
	public List<Order> getAll_Order_For_a_Customer_Only_Delivered(String custUsername) {
		
		return orderDAO.getAll_Order_For_a_Customer_Only_Delivered(custUsername);
	}

	@Override
	public List<Customer> getAll_Order_For_All_Customer_Out_For_Deliver() {
		
		return orderDAO.getAll_Order_For_All_Customer_Out_For_Deliver();
	}

	@Override
	public List<Customer> getAll_Order_For_All_Customer_Out_For_PickUp() {
		
		return orderDAO.getAll_Order_For_All_Customer_Out_For_PickUp();
	}

	@Override
	public boolean addFeedback(String custUsername, int orderId, Order order) {
		
		return orderDAO.addFeedback(custUsername, orderId, order);
	}

}

