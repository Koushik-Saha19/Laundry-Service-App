package com.dxc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.model.Customer;
import com.dxc.model.Order;
import com.dxc.service.OrderService;



@RestController
//@RequestMapping("/")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:4200"})
public class OrderController {

	
	@Autowired
	OrderService orderService;
	Customer customer = new Customer();
	Order order = new Order();
	//To fetch all Reviews of a particular product
		@GetMapping("/allOrder/{custUsername}")
		public ResponseEntity<List<Order>> getAllOrder(@PathVariable("custUsername")String custUsername) {
			System.out.println("Fetching all order" );
			List<Order> allOrder = orderService.getAllOrder_for_a_customer(custUsername);
			System.out.println(allOrder);
			return new ResponseEntity<List<Order>>(allOrder,HttpStatus.OK);
		}
		
		
		
		@PostMapping("/addOrder/{custUsername}")
		public boolean addOrder(@PathVariable("custUsername")String custUsername,@RequestBody Order order) {
			System.out.println("saving order");
			orderService.addOrder(custUsername,order);
     		return true;
				
		}
	
		@GetMapping("/getOrder/{custUsername}/{orderId}")
		public Order getOrder(@PathVariable("custUsername")String custUsername,@PathVariable("orderId")int orderId) {
			
			order = orderService.getOrder(custUsername, orderId);
			System.out.println(order);
			return order;
		}
		
		
		
		
		
		@DeleteMapping("admin/deleteOrder/{custUsername}/{orderId}")
		public Boolean deleteOrder(@PathVariable("custUsername")String custUsername,@PathVariable("orderId")int orderId) {
			
			System.out.println("delete order called " );
		    
			orderService.deleteOrder(custUsername,orderId);
			
			return true;
			}
		
		@PutMapping("admin/updateOrder/{custUsername}/{orderId}")
		public Boolean updateOrder(@PathVariable("custUsername")String custUsername,@PathVariable("orderId")int orderId,@RequestBody Order order) {
			System.out.println("Update order is called");
			orderService.updateOrder(custUsername,orderId,order);
			return true;
		}
		
		@GetMapping("/getOrderByStatus/{orderStatus}")
		public ResponseEntity<List<Customer>> getAllOrderByStatus(@PathVariable("orderStatus")String orderStatus){
			System.out.println("getOrderByStatus is called");
			List<Customer> allOrderByStatus = orderService.getOrderByStatus(orderStatus);
			return new ResponseEntity<List<Customer>>(allOrderByStatus,HttpStatus.OK);
			
		}
		
	//____________________________________________ORDER RETRIEVING FOR ADMIN, CUSTOMER, DELIVER	
		
		//for admin
		@GetMapping("/admin/PresentOrder")
		public List<Customer> getAll_Order_For_All_Customer_Except_Delivered(){
			
			
			return orderService.getAll_Order_For_All_Customer_Except_Delivered();
		}
		@GetMapping("/admin/PastOrder")
		public List<Customer> getAll_Order_For_All_Customer_Only_Delivered(){
			
			return orderService.getAll_Order_For_All_Customer_Only_Delivered();
		}
		
		//for customer
		@GetMapping("/{custUsername}/PresentOrder")
		public List<Order> getAll_Order_For_a_Customer_Except_Delivered(@PathVariable("custUsername")String custUsername){
			return orderService.getAll_Order_For_a_Customer_Except_Delivered(custUsername);
		}
		@GetMapping("/{custUsername}/PastOrder")
		public List<Order> getAll_Order_For_a_Customer_Only_Delivered(@PathVariable("custUsername")String custUsername){
			return orderService.getAll_Order_For_a_Customer_Only_Delivered(custUsername);
		}
		
		//for deliver
		@GetMapping("/deliver/OutForDelivery")
		public List<Customer> getAll_Order_For_All_Customer_Out_For_Deliver(){
			
			
			return orderService.getAll_Order_For_All_Customer_Out_For_Deliver();
			
			
			
		}
		@GetMapping("/deliver/OutForPickUp")
		public List<Customer> getAll_Order_For_All_Customer_Out_For_PickUp(){
			return orderService.getAll_Order_For_All_Customer_Out_For_PickUp();
		}
		
		@PutMapping("addFeedback/{custUsername}/{orderId}")
		public boolean addFeedback(@PathVariable("custUsername")String custUsername,@PathVariable("orderId")int orderId,@RequestBody Order order) {
			
			return orderService.addFeedback(custUsername, orderId, order);
		}
		
	
}
