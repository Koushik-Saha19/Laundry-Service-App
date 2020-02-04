import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Switch,Route, Redirect} from 'react-router-dom'


class Userpage extends Component {
    constructor(props){
        super(props)
       
        this.state = {
            username: this.props.match.params.username
            
        }
    }

    placeOrder = () =>{
        this.props.history.push(`/placeOrder/${this.state.username}`)
    }

    pastOrders = () =>{
        this.props.history.push(`/UserPastOrders/${this.state.username}`)
    }

    currentOrders=()=>{
        this.props.history.push(`/UserCurrentOrders/${this.state.username}`)
    }

    logout = ()=>{
        // localStorage.clear()
        this.props.history.push('/')
        
        

    }

    render() { 
        
        return ( 
            <div className="container">
                
            <div className="row">
                <div className="col-5 offset-4">
                    <h2>Welcome {this.state.username}!</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-2 offset-2 ">                    
                    <button className="btn btn-primary" style={{marginTop:'50%'}} onClick={this.placeOrder}>Place Order</button>
                </div>

                <div className="col-2">                    
                    <button className="btn btn-info" style={{marginTop:'50%'}} onClick={this.currentOrders}>Current Orders</button>
                </div>

                <div className="col-2">                    
                    <button className="btn btn-primary" style={{marginTop:'50%'}} onClick={this.pastOrders}>Past Orders</button>
                </div>

                <div className="col-2">                    
                    <button className="btn btn-danger" style={{marginTop:'50%'}} onClick={this.logout}>Logout</button>
                </div>
            </div>
            
            
            
        </div>
         );
    }
}
 
export default Userpage;