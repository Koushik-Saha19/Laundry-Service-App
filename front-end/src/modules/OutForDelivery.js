import React, { Component } from 'react';
import Dataservice from '../service/Dataservice'
class OutForDelivery extends Component {

    constructor(props){
        super(props)
        this.state={
            customers:[]
        }
        this.refreshProduct=this.refreshProduct.bind(this)
        this.backButton = this.backButton.bind(this)
    }

    componentWillMount(){
        this.refreshProduct()

    }

    refreshProduct(){
        Dataservice.OutForDelivery().then(response =>{
            this.setState({
                customers:response.data
            })
        })

    }

    delivered(custUsername,orderId,typeOfService,quantity,orderStatus){
        this.props.history.push(`/DeliveryUpdate/${custUsername}/${orderId}/${typeOfService}/${quantity}/${orderStatus}`)

    }
    backButton(){
        this.props.history.push('deliverPage')
            }

    render() {
        return (
            <div>
                <h5><button onClick={this.backButton} >&#8249; Previous</button></h5>
            <div className="container">
                
            <h1><center>Out For Delivery</center></h1>
            <table  cellPadding="30" className="table table-hover" >
                    <thead>
                        <th style={{textAlign:'center'}}>Customer Name</th>
                        <th style={{textAlign:'center'}}>Society Name</th>
                        <th style={{textAlign:'center'}}>Phone</th>
                        <th colSpan='4' style={{textAlign:'center'}}>Orders</th>
                        
                    </thead>
                    <tbody>
                       {this.state.customers.map(customer =>(
                           <tr>
                                <td>{customer.custName}</td>
                                <td>{customer.custSociety}</td>
                                <td>{customer.custPhone}</td>
                               

                                <td>
                                    <table border="3" cellPadding="30" className="table table-hover">

                                        <thead>
                                            <th style={{textAlign:'center'}}>Order Id</th>
                                            <th style={{textAlign:'center'}}>Type Of Service</th>
                                            <th style={{textAlign:'center'}}>No of clothes</th>
                                            <th style={{textAlign:'center'}}>Order Status</th>
                                            <th style={{textAlign:'center'}}>Action</th>
                                            
                                        </thead>
                                        <tbody>
                                            {customer.order.map(order =>(
                                                <tr key={order.orderId}>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.typeOfService}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.orderStatus}</td>
                                                    <td><button className="btn btn-warning" onClick={()=>this.delivered(customer.custUsername,order.orderId,order.typeOfService,order.quantity,order.orderStatus)}>Delivered</button></td>
                                                    
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


export default OutForDelivery;