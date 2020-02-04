import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dataservice from '../service/Dataservice';

class AdminPastOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers : [],
            custName :''

        }
this.backButton = this.backButton.bind(this)
    }

    componentWillMount() {
        this.refreshProduct()

    }

    refreshProduct = () =>{
        Dataservice.AdminPastOrders().then(response =>{
            this.setState({
                customers:response.data
            })
        })
        console.log(this.state.customers)
    }

    backButton(){
    this.props.history.push('adminPage')
    }
        

    render() {
        return (
            <div>
                 <h5><button onClick={this.backButton} >&#8249; Previous</button></h5>
            <div className="container">
                <h1><center>Delivered Orders</center></h1>
                <table  cellPadding="30" className="table table-hover">
                        <thead>
                        <th style={{textAlign:'center'}}>Customer Name</th>
                            <th style={{textAlign:'center'}}>Society</th>
                            <th style={{textAlign:'center'}}>Phone</th>
                            <th style={{textAlign:'center'}}>Email</th>
                            <th colSpan='4' style={{textAlign:'center'}}>Orders</th>
                            
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
                                                <th style={{textAlign:'center'}}>Order Feedback</th>
                                                
                                            </thead>
                                            <tbody>
                                                {customer.order.map(order =>(
                                                    <tr key={order.orderId}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.typeOfService}</td>
                                                        <td>{order.quantity}</td>
                                                        <td>{order.orderStatus}</td>
                                                        <td>{order.feedback}</td>
                                                        
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
                    <h5><button onClick={this.backButton} >&#8249; Previous</button></h5>
            </div>
            </div>
        );
    }
}

AdminPastOrders.propTypes = {

};

export default AdminPastOrders;