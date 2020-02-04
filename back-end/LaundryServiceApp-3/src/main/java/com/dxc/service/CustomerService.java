package com.dxc.service;

import java.util.List;

import com.dxc.model.Customer;

public interface CustomerService {

	public List<Customer> getAllCustomers();
	//public Customer getCustomerById(int custId);
	public Customer getCustomerByUsername(String custUsername);
	public boolean addCustomer(Customer customer);
	public boolean updateCustomer(Customer customer);
	public boolean deleteCustomer(String custUsername);
	public List<Customer> searchCustomerByName(String custName);
	public boolean isCustomerExist(String custUsername);
	public boolean isUsernameExist(String custUsername);
	
	public boolean change_Or_forget_password(String custUsername,String custSecurityanswer,String custPassword);
	
	public boolean checkUsernamePassword(String custUsername,String password);
}
