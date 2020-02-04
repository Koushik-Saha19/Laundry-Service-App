package com.dxc.service;

import java.util.List;

import com.dxc.model.Customer;
import com.dxc.model.Order;

public interface OrderService {

	public List<Order> getAllOrder_for_a_customer(String custUsername);
	public Order getOrder(String custUsername, int orderId);
	public boolean addOrder(String custUsername,Order order);
	
	public boolean updateOrder(String custUsername,int orderId,Order Order);
	//public boolean updateOrder(String custUsername,Order Order);
	public boolean deleteOrder(String custUsername,int orderId);
	public List<Customer> getOrderByStatus(String status);
	
	
	

	//for admin side all present order of all customer
	public List<Customer> getAll_Order_For_All_Customer_Except_Delivered();
	
	//for admin side all past order of all customer
	public List<Customer> getAll_Order_For_All_Customer_Only_Delivered();
	
	
	
	
	//for a particular user all present order
	public List<Order> getAll_Order_For_a_Customer_Except_Delivered(String custUsername);
	
	//for a particular user all past order
	public List<Order> getAll_Order_For_a_Customer_Only_Delivered(String custUsername);
	
	
	
	
	//for deliver all the order which are "out for deliver"
	public List<Customer> getAll_Order_For_All_Customer_Out_For_Deliver();
	
	//for deliver all the order which are "out for pickUp"
	public List<Customer> getAll_Order_For_All_Customer_Out_For_PickUp();
	
	
	public boolean addFeedback(String custUsername, int orderId, Order order);
	
	
	
}
