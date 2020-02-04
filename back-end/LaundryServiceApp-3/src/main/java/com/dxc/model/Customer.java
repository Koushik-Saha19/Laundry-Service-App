package com.dxc.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import com.dxc.model.Order;

@Component
@Document(collection= "customer")
public class Customer {

	
	
	
	@Id
	private int custId;
	private String typeOfUser;
	private String custName;
	private String custEmail;
	private String custPhone;
	private String custSociety;
	private String custUsername;
	private String custPassword;
	private String custSecurityanswer;
	
	private List<Order> order;
	
	
	
	
	public Customer() {
		
	}




	public Customer(int custId, String typeOfUser, String custName, String custEmail, String custPhone,
			String custSociety, String custUsername, String custPassword, String custSecurityanswer,
			List<Order> order) {
		super();
		this.custId = custId;
		this.typeOfUser = typeOfUser;
		this.custName = custName;
		this.custEmail = custEmail;
		this.custPhone = custPhone;
		this.custSociety = custSociety;
		this.custUsername = custUsername;
		this.custPassword = custPassword;
		this.custSecurityanswer = custSecurityanswer;
		this.order = order;
	}




	public int getCustId() {
		return custId;
	}




	public void setCustId(int custId) {
		this.custId = custId;
	}




	public String getTypeOfUser() {
		return typeOfUser;
	}




	public void setTypeOfUser(String typeOfUser) {
		this.typeOfUser = typeOfUser;
	}




	public String getCustName() {
		return custName;
	}




	public void setCustName(String custName) {
		this.custName = custName;
	}




	public String getCustEmail() {
		return custEmail;
	}




	public void setCustEmail(String custEmail) {
		this.custEmail = custEmail;
	}




	public String getCustPhone() {
		return custPhone;
	}




	public void setCustPhone(String custPhone) {
		this.custPhone = custPhone;
	}




	public String getCustSociety() {
		return custSociety;
	}




	public void setCustSociety(String custSociety) {
		this.custSociety = custSociety;
	}




	public String getCustUsername() {
		return custUsername;
	}




	public void setCustUsername(String custUsername) {
		this.custUsername = custUsername;
	}




	public String getCustPassword() {
		return custPassword;
	}




	public void setCustPassword(String custPassword) {
		this.custPassword = custPassword;
	}




	public String getCustSecurityanswer() {
		return custSecurityanswer;
	}




	public void setCustSecurityanswer(String custSecurityanswer) {
		this.custSecurityanswer = custSecurityanswer;
	}




	public List<Order> getOrder() {
		return order;
	}




	public void setOrder(List<Order> order) {
		this.order = order;
	}




	@Override
	public String toString() {
		return "Customer [custId=" + custId + ", typeOfUser=" + typeOfUser + ", custName=" + custName + ", custEmail="
				+ custEmail + ", custPhone=" + custPhone + ", custSociety=" + custSociety + ", order=" + order + "]";
	}

	



	


}
