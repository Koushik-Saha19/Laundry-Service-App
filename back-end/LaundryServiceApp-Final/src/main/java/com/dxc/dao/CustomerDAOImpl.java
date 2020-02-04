package com.dxc.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.dxc.model.Customer;
import com.dxc.model.Order;
import com.mongodb.WriteResult;

@Repository
public class CustomerDAOImpl implements CustomerDAO {

	@Autowired
	MongoTemplate mongoTemplate;

	@Autowired
	Customer customer;

	@Override
	public boolean addCustomer(Customer customer) {
		System.out.println("Inside DAO :" + customer);

		ArrayList<Integer> all_Id = new ArrayList<Integer>();
        List<Customer> allCustomer = mongoTemplate.findAll(Customer.class, "customer");
        for (Customer cust : allCustomer) {
             all_Id.add(cust.getCustId());
            
        }
        List<Integer> sortedList = all_Id.stream().sorted().collect(Collectors.toList());
        int size = sortedList.size();
		int count = 0;
        if(size == 0) {
		count = 0;
		}
		else {
		 count = sortedList.get(size - 1);
		}
		customer.setCustId(count+1);
		customer.setTypeOfUser("Customer");
		
		
		List<Order> orderList = new ArrayList<Order>();
		customer.setOrder(orderList);
		
		if(isUsernameExist(customer.getCustUsername())) {
			mongoTemplate.save(customer);
			return true;
		}
		else {
			
			return false;
		}
		
		
//		mongoTemplate.save(customer);
//		return true;
	}

	@Override
	public List<Customer> getAllCustomers() {

		List<Customer> allCustomer = mongoTemplate.findAll(Customer.class, "customer");
		System.out.println(allCustomer);
		return allCustomer;
	}

	@Override
	public Customer getCustomerByUsername(String custUsername) {
        Query query = new Query();
        query.addCriteria(Criteria.where("custUsername").is(custUsername));
		
		return mongoTemplate.findOne(query, Customer.class, "customer");
	}

	@Override
	public boolean updateCustomer(Customer customer) {

		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(customer.getCustUsername()));

		Update update = new Update();

		update.set("custName", customer.getCustName());
		update.set("custEmail", customer.getCustEmail());
		update.set("custPhone", customer.getCustPhone());
		update.set("custSociety", customer.getCustSociety());

		WriteResult updateResult = mongoTemplate.updateFirst(query, update, Customer.class);
		System.out.println(updateResult);
		int rowsAffected = (int) updateResult.getN();
		if (rowsAffected == 0)
			return false;
		else
			return true;
	}

	@Override
	public boolean deleteCustomer(String custUsername) {
         
	
		
		System.out.println(custUsername);
		
		customer = getCustomerByUsername(custUsername);

		
		
		System.out.println(customer);
		WriteResult deleteResult = mongoTemplate.remove(customer);
		System.out.println(deleteResult);
		int rowsAffected = (int) deleteResult.getN();
		if (rowsAffected == 0)
			return false;
		else
			return true;
	}

	@Override
	public List<Customer> searchCustomerByName(String custName) {

		Query query = new Query();
		query.addCriteria(Criteria.where("custName").is(custName));
		List<Customer> allCustomer = mongoTemplate.find(query, Customer.class);
		System.out.println(allCustomer);
		return allCustomer;
	}

	@Override
	public boolean isCustomerExist(String custUsername) {

		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(custUsername));
		Customer customer = mongoTemplate.findOne(query, Customer.class, "customer");
		
		//Customer customer = mongoTemplate.findById(custUsername, Customer.class, "customer");
		if (customer == null)
			return false;
		else
			return true;
	}
	
	@Override
	public boolean isUsernameExist(String custUserName) {

		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(custUserName));
		Customer customer = mongoTemplate.findOne(query, Customer.class, "customer");
		if (customer == null)
			return true;
		else
			return false;
	}
	

	

	@Override
	public boolean change_Or_forget_password(String custUsername,String custSecurityanswer,String custPassword) {
		
		Customer customer2 = getCustomerByUsername(custUsername);
        System.out.println("inside forgrt_password of customerDAOImpl");
        
        if(customer2.getCustSecurityanswer().equals(custSecurityanswer)) {
        	Query query = new Query();
    		query.addCriteria(Criteria.where("custUsername").is(custUsername));
    		Update update = new Update();
    	    update.set("custPassword", custPassword);
    	    WriteResult updateResult = mongoTemplate.updateFirst(query, update, Customer.class);

    		int rowsAffected = (int) updateResult.getN();
    		if (rowsAffected == 0)
    			return false;
    		else
    			return true;
        }
        else
        	return false;
	}

	@Override
	public boolean checkUsernamePassword(String custUsername,String custPassword) {
		
		System.out.println("inside checkUsernamePassword");
		Query query = new Query();
		query.addCriteria(Criteria.where("custUsername").is(custUsername));
		Customer customer = mongoTemplate.findOne(query, Customer.class, "customer");
		System.out.println(customer);
		System.out.println(custPassword);
		System.out.println(customer.getCustPassword());
		if(customer.getCustPassword().equals(custPassword)) 
		{
			return true;
		}
		else
		{
		return false;
		}
	}

}
