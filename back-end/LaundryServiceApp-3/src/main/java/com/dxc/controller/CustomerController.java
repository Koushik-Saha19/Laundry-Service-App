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
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.model.Customer;
import com.dxc.service.CustomerService;

@RestController
//@RequestMapping("customer")
@CrossOrigin(origins= {"http://localhost:3000","http://localhost:4200"})
public class CustomerController {

	@Autowired
	CustomerService customerService;
	
	
	//to get all customer
	@GetMapping("/getAllCustomer")
	public ResponseEntity<List<Customer>> getAllCustomer() {
		System.out.println("Fetching all costomer" );
		List<Customer> allCustomer = customerService.getAllCustomers();
		return new ResponseEntity<List<Customer>>(allCustomer,HttpStatus.OK);
	}
	
	   //Getting a single customer
		@GetMapping("/getCustomerByUsername/{custUsername}")
		public ResponseEntity<Customer> getCustomerByUsername(@PathVariable("custUsername")String custUsername) {
			System.out.println("Get product called with custId " + custUsername );

			if(customerService.isCustomerExist(custUsername)) {
				Customer customer = customerService.getCustomerByUsername(custUsername);
				return new ResponseEntity<Customer>(customer,HttpStatus.OK);
			}
			else {
				return new ResponseEntity<Customer>(HttpStatus.NO_CONTENT);
			}
		}
	
	
	
	//to add customer
	@PostMapping("/addCustomer")
	public boolean addCustomer(@RequestBody Customer customer) {
		
		if(customerService.isUsernameExist(customer.getCustUsername())) {
			
			
			System.out.println("saving product");
	        customerService.addCustomer(customer);
			System.out.println(customer);
			return true;
		}
		else {
		    return false;
		}
		
	}
	
	   //to delete customer
		@DeleteMapping("/deleteCustomer/{custUsername}")
		public ResponseEntity<Customer> deleteCustomer(@PathVariable("custUsername")String custUsername) {
			System.out.println("delete customer called " );
		
			if(customerService.isCustomerExist(custUsername)) {
				customerService.deleteCustomer(custUsername);
				//Customer customer = customerService.getCustomerByUsername(custUsername);
				return new ResponseEntity<Customer>(HttpStatus.NO_CONTENT);
			}
			else {
				return new ResponseEntity<Customer>(HttpStatus.NO_CONTENT);
			}
		}
	
		//to update customer
		@PutMapping("/updateCustomer/{custUsername}")
		public ResponseEntity<Customer> updateCustomer(@PathVariable("custUsername")String custUsername,@RequestBody Customer customer) {
			System.out.println("update a customer called");
			
			if(customerService.isCustomerExist(custUsername)) {
				customerService.updateCustomer(customer);
				return new ResponseEntity<Customer>(customer,HttpStatus.OK);
			}
			else {
				return new ResponseEntity<Customer>(customer,HttpStatus.NOT_FOUND);
			}
					
		}
		
		//search customer by name
		@GetMapping("/searchCustomerByName/{custName}")
		public ResponseEntity<List<Customer>> searchCustomerByName(@PathVariable("custName")String custName){
			System.out.println("searchCustomerByName is called");
			List<Customer> allCustomer = customerService.searchCustomerByName(custName);
			return new ResponseEntity<List<Customer>>(allCustomer,HttpStatus.OK);
			
					
		}

		
		@PutMapping("/changePassword/{custUsername}/{custSecurityanswer}/{custPassword}")
		public boolean forgot_change_password(@PathVariable("custUsername")String custUsername,@PathVariable("custSecurityanswer") String custSecurityanswer,@PathVariable("custPassword") String custPassword) {
			
			
			
        if(customerService.isCustomerExist(custUsername)) {
				
				customerService.change_Or_forget_password(custUsername,custSecurityanswer,custPassword);
				
				return true;
			}
			else {
				return false;
			}
		}
	
		@GetMapping("/checkUsernamePassword/{custUsername}/{custPassword}")
		public boolean check_username_password_correspond_to_same_customer(@PathVariable("custUsername")String custUsername,@PathVariable("custPassword")String custPassword) {
			
			System.out.println("inside customer controller");
			System.out.println(custPassword);
			if(customerService.isCustomerExist(custUsername)) {
				
				return customerService.checkUsernamePassword(custUsername,custPassword);
				
				
			}
			else {
			    return false;
			}
		}
		
		
		
	
}

