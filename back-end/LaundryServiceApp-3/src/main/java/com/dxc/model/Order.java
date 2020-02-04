package com.dxc.model;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

@Component
public class Order {

	@Id
	private int orderId;
	private String typeOfService;
	private int quantity;
	private String orderStatus;
	private String feedback;
	
	
	public Order() {
		
	}


	public Order(int orderId, String typeOfService, int quantity, String orderStatus, String feedback) {
		super();
		this.orderId = orderId;
		this.typeOfService = typeOfService;
		this.quantity = quantity;
		this.orderStatus = orderStatus;
		this.feedback = feedback;
	}


	public int getOrderId() {
		return orderId;
	}


	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}


	public String getTypeOfService() {
		return typeOfService;
	}


	public void setTypeOfService(String typeOfService) {
		this.typeOfService = typeOfService;
	}


	public int getQuantity() {
		return quantity;
	}


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	public String getOrderStatus() {
		return orderStatus;
	}


	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}


	public String getFeedback() {
		return feedback;
	}


	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}


	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", typeOfService=" + typeOfService + ", quantity=" + quantity
				+ ", orderStatus=" + orderStatus + ", feedback=" + feedback + "]";
	}



	
}
