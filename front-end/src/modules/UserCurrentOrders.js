import React, { Component } from 'react';
import Dataservice from '../service/Dataservice';

class UserCurrentOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : this.props.match.params.username,
            orders : []
        }
        this.backButton = this.backButton.bind(this)
    }

    componentWillMount() {
        this.refreshProduct()

    }

    refreshProduct=()=>{
        Dataservice.UserCurrentOrders(this.state.username).then(response=>{
            this.setState({
                orders : response.data
            })
        })
        
    }

    contact=()=>{
        this.props.history.push('/ContactUs')
    }

    backButton(){
        this.props.history.goBack()
            }

    render() {
        return (
            <div>
                 <h5><button onClick={this.backButton} >&#8249; Previous</button></h5>
            
            <div className="container">
                <div style={{marginTop:'5%'}}></div>
                {this.state.orders.map( order =>(
                    
                    <div className="card"  style={{margin:'auto',marginBottom:'3%',background:'beige',width:'40rem'}}>
                        
                            
                        
                        <div className="card-body">
                            <h5 className="card-title" style={{color:'#48bd67'}}><b>Order ID: {order.orderId}</b></h5>
                            <p className="card-text"><b>Service: </b>{order.typeOfService}</p>
                            <p className="card-text"><b>No. of Clothes: </b>{order.quantity}</p>
                            <p className="card-text"><b>Order Status: </b>{order.orderStatus}</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-link" onClick={this.contact}>Contact Us</button>
                        </div>
                        
                    </div>
                    
                    
                ))}
                

            </div>
            </div>
        );
    }
}



export default UserCurrentOrders;