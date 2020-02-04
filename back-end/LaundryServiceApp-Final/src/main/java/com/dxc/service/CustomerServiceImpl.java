package com.dxc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dxc.dao.CustomerDAO;
import com.dxc.model.Customer;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	CustomerDAO customerDAO;
	
	@Override
	public List<Customer> getAllCustomers() {
		
		return customerDAO.getAllCustomers();
	}

	@Override
	public Customer getCustomerByUsername(String custUsername) {
		
		return customerDAO.getCustomerByUsername(custUsername);
	}

	@Override
	public boolean addCustomer(Customer customer) {
		
		return customerDAO.addCustomer(customer);
	}

	@Override
	public boolean updateCustomer(Customer customer) {
		
		return customerDAO.updateCustomer(customer);
	}

	@Override
	public boolean deleteCustomer(String custUsername) {
		
		return customerDAO.deleteCustomer(custUsername);
	}

	@Override
	public List<Customer> searchCustomerByName(String custName) {
		
		return customerDAO.searchCustomerByName(custName);
	}

	@Override
	public boolean isCustomerExist(String custUsername) {
		
		return customerDAO.isCustomerExist(custUsername);
	}

	@Override
	public boolean isUsernameExist(String custUsername) {
		
		return customerDAO.isUsernameExist(custUsername);
	}
	
	
	@Override
	public boolean change_Or_forget_password(String custUsername,String custSecurityanswer,String custPassword) {
		
		return customerDAO.change_Or_forget_password(custUsername,custSecurityanswer,custPassword);
	}

	@Override
	public boolean checkUsernamePassword(String custUsername,String custPassword) {
		
		return customerDAO.checkUsernamePassword(custUsername,custPassword);
	}

	



}
