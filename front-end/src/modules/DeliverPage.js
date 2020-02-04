import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Deliverpage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.deliver=this.deliver.bind(this)
        this.pickup=this.pickup.bind(this)
    }

    deliver(){
        this.props.history.push('/OutForDelivery')

    }

    pickup(){
        this.props.history.push('/OutForPickup')

    }

    logout = ()=>{
        this.props.history.push('/')
    }
    render() { 
        return ( 
            <div className="container">
                <div className="container">
                
                <center><h1>Delivery Executive Page!</h1></center>
                <div className="row" style={{marginTop:'10%'}}>
                    <div className="col-3 offset-2"><button className="btn btn-outline-dark" onClick={this.deliver}>Deliver</button></div>
                    <div className="col-3"><button className="btn btn-outline-secondary" onClick={this.pickup}>Pick up</button></div>
                    <div className="col-3"><button className="btn btn-outline-danger" onClick={this.logout}>Logout</button></div>
                </div>
            
            
            </div>
                
            </div>
         );
    }
}
 
export default Deliverpage;