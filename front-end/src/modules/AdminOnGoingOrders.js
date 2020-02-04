import React, { Component } from 'react';
import Dataservice from '../service/Dataservice';



class AdminOnGoingOrders extends Component {

    constructor(props){
        super(props)
        this.state={
            customers:[],
            // typeOfService:'',
            // quantity:'',
            // orderStatus:'',
            custName:''
            
        }
        this.refreshProduct=this.refreshProduct.bind(this)
        this.action=this.action.bind(this)
        this.deleteOrder=this.deleteOrder.bind(this)
        this.backButton = this.backButton.bind(this)
    }

    componentWillMount(){
        this.refreshProduct()
    }

    refreshProduct(){
        Dataservice.AdminOnGoingOrders().then(response =>{
            this.setState({
                customers:response.data
            })
        })
    }

    action(custUsername,orderId,typeOfService,quantity,orderStatus) 
    {
         
        this.props.history.push(`/AdminOrderUpdate/${custUsername}/${orderId}/${typeOfService}/${quantity}/${orderStatus}`)
        

    }
    deleteOrder(username,id){
        Dataservice.DeleteOrder(username,id).then(response => {
            this.refreshProduct()
        })
        
    }     
    backButton(){

    this.props.history.push('adminPage')
    }    








        
  
    render() {
        return (
            <div>
                <h5><button onClick={this.backButton}>&#8249; Previous</button></h5>
                 <h1><center>All ongoing orders</center></h1>
                <div className="container">
                    <table  cellPadding="30" className="table table-hover">
                        <thead>
                            <th style={{textAlign:'center'}}>Customer Name</th>
                            <th style={{textAlign:'center'}}>Society</th>
                            <th style={{textAlign:'center'}}>Phone</th>
                            <th style={{textAlign:'center'}}>Email</th>
                            <th colSpan="4" style={{textAlign:'center'}}>Orders</th>
                        </thead>
                        <tbody>
                           {this.state.customers.map(customer =>(
                               <tr>
                                    <td>{customer.custName}</td>
                                    <td>{customer.custSociety}</td>
                                    <td>{customer.custPhone}</td>
                                    <td>{customer.custEmail}</td>
                                   

                                    <td>
                                        <table border="5" cellPadding="30" className="table table-hover">

                                            <thead>
                                                <th style={{textAlign:'center'}}>Order Id</th>
                                                <th style={{textAlign:'center'}}>Type Of Service</th>
                                                <th style={{textAlign:'center'}}>No of clothes</th>
                                                <th style={{textAlign:'center'}}>Order Status</th>
                                                <th style={{textAlign:'center'}}>Update</th>
                                                <th style={{textAlign:'center'}}>Delete</th>
                                            </thead>
                                            <tbody>
                                                {customer.order.map(order =>(
                                                    <tr key={order.orderId}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.typeOfService}</td>
                                                        <td>{order.quantity}</td>
                                                        <td>{order.orderStatus}</td>
                                                        <td><button className="btn btn-warning" onClick={()=>this.action(customer.custUsername,order.orderId,order.typeOfService,order.quantity,order.orderStatus)}>Update</button></td>
                                                        <td><button className="btn btn-danger" onClick={() => this.deleteOrder(customer.custUsername,order.orderId)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>


                                        </table>


                                    </td>


                               </tr>


                           )
                               
                           )}
                        
                        
                        
                        
                        
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default AdminOnGoingOrders;