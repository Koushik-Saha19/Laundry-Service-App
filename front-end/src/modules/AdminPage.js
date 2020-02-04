import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Adminpage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.onGoing=this.onGoing.bind(this)
    }

    onGoing(){
        this.props.history.push('/AdminOnGoingOrders')
    }
    delivered = () =>{
        this.props.history.push('/AdminPastOrders')
    }
    logout = ()=>{
        this.props.history.push('/')
    }
    render() { 
        return ( 
        <div className="container">
            <div className="container">
            <center><h1>Admin Page!</h1></center>
                <div className="row" style={{marginTop:'15%'}}>
                    <div className="col-3 offset-2"><button className="btn btn-outline-info" onClick={this.onGoing}>On Going Orders</button></div>
                    <div className="col-3"><button className="btn btn-outline-success" onClick={this.delivered}>Delivered Orders</button></div>
                    <div className="col-3"><button className="btn btn-outline-danger" onClick={this.logout}>Logout</button></div>
                </div>
            
            
            </div>
            
        </div>
         );
    }
}
 
export default Adminpage;