import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Dataservice from '../service/Dataservice';


class AdminOrderUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custUsername: this.props.match.params.custUsername,
            orderId : this.props.match.params.orderId,
            typeOfService : this.props.match.params.typeOfService,
            quantity : this.props.match.params.quantity,
            orderStatus: this.props.match.params.orderStatus
            
            
        }
        this.backButton = this.backButton.bind(this)

    }

    

    onSubmit = (value)=>{
       
        this.setState({
            orderStatus:value.orderStatus
        })
       let order={
           orderId:value.orderId,
           typeOfService:value.typeOfService,
           quantity:value.quantity,
           orderStatus:value.orderStatus
       }
        
        Dataservice.UpdateOrder(this.state.custUsername,this.state.orderId,order)
        this.props.history.push('/AdminOnGoingOrders')

    }
    backButton(){
this.props.history.goBack()
    }

    render() {
        
        let {custUsername,orderId,typeOfService,quantity,orderStatus} = this.state
        return (
            <div>
                <h5><button onClick={this.backButton} >&#8249; Previous</button></h5>
            <div className="container">
                <div className="card" style={{margin:'auto'}}>
                    <div className="card-body">
                        <h2><center>Order Update</center></h2>
                        <Formik initialValues = {{custUsername,orderId,typeOfService,quantity,orderStatus}}
                        enableReinitialize = {true}
                        onSubmit = {this.onSubmit}
                        validateOnChange = {false}
                        validateOnBlur = {false}
                        validate = {this.orderFormValidate}>
                            <Form>
                                <fieldset className="form-group">
                                    <label>Username</label>
                                    <Field className="form-control" type='text' name="custName" value={custUsername} disabled></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Order ID</label>
                                    <Field className="form-control" type='text' name="orderId" value={orderId} disabled></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Service</label>
                                    <Field className="form-control" type='text' name="typeOfService" value={typeOfService} disabled></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>No. of Clothes</label>
                                    <Field className="form-control" type='text' name="quantity" value={quantity} disabled></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Order Status</label>
                                    <Field className="form-control" type='text' name="orderStatus" ></Field>
                                </fieldset>
                                <fieldset className = "form-group">
                                    <button type='submit' className="btn btn-success btn-block">Update</button>
                                </fieldset>
                            </Form>
                        
                        </Formik>


                    </div>
                </div>
                <br></br>
                <h5><button onClick={this.backButton} >&#8249; Previous</button></h5>
            </div>
            
            </div>
        );
    }
}



export default AdminOrderUpdate;