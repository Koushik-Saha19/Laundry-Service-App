import React, { Component } from 'react';
import Dataservice from '../service/Dataservice';

class UserPastOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : this.props.match.params.username,
            orders : []
        }
        this.feedback=this.feedback.bind(this)
        this.handleBack=this.handleBack.bind(this)

    }

    componentWillMount() {
        this.refreshProduct()

    }

    refreshProduct = () =>{
        Dataservice.UserPastOrders(this.state.username).then(response => {
            this.setState ({
                orders : response.data
            })
        })
    }

    feedback(username,orderId){
        this.props.history.push(`/Rating/${username}/${orderId}`)

    }
     
   

    handleBack(){
        this.props.history.push(`/userPage/${this.state.username}`)
    }

    render() {
        return (
            <div>
                
                 <h5><button onClick={this.handleBack}>Previous</button></h5>
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
                            <button className="btn btn-link" onClick={()=>this.feedback(this.state.username,order.orderId)}>Feedback</button>
                        </div>
                        
                    </div>
                    
                    
                ))}
                

            </div>
            </div>
        );
    }
}


export default UserPastOrders;