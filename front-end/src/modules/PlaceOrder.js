import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Dataservice from '../service/Dataservice'

class Placeorder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username : this.props.match.params.username,
            typeOfServiceState:'',
            quantityState:'',
            orderStatusState:'OrderPlaced'

        }
        this.backButton = this.backButton.bind(this)
    }

    onSubmit = (value) =>{
        let orderObject = {
            typeOfService : value.typeOfServiceState,
            quantity : value.quantityState,
            orderStatus : this.state.orderStatusState
            
        }
        Dataservice.placeOrder(value.username,orderObject)
        alert("Order placed successfully")
        this.props.history.push(`/userPage/${this.state.username}`)
        
    }
    backButton(){
        this.props.history.goBack()
            }

     render() { 
        let {username,typeOfServiceState,quantityState,orderStatusState} = this.state
        return ( 
            <div>
                 <h5><button onClick={this.backButton} >&laquo; Previous</button></h5>
           
            <div className="container" style={{justifyContent:'center',textAlign:'center',alignContent:'center'}}>
                <div style={{minHeight:'100'}}></div>
                <div className="card " style={{margin:'auto',marginTop:'5%',width:"70%",height:"80vh",background:'beige'}}>
                    <div className="card card-header">
                        <h2><center>Place Order</center></h2>
                    </div>
                    <div className="card card-body" style={{background:'beige'}}>
                        <Formik initialValues = {{username,typeOfServiceState,quantityState}}
                        enableReinitialize = {true}
                        onSubmit = {this.onSubmit}
                        validateOnChange = {false}
                        validateOnBlur = {false}
                        validate = {this.orderFormValidate}>
                            <Form>
                                
                                <fieldset className="form-group">
                                    <label htmlFor = "username">Username</label>
                                    <Field className="form-control" type="text" name="username" id="username" value={username} disabled></Field>
                                </fieldset>
 
                                <fieldset>
                                    <div className="row">
                                    <div className="col-3">
                                        Choose a service:
                                    </div>
                                    <div className="col-6">
                                        <div className="form-check">
                                            <label>
                                                <Field
                                                type="radio"
                                                name="typeOfServiceState"
                                                value="Normal Wash"                                            
                                                />
                                                Normal Wash
                                            </label>
                                            </div>

                                            <div className="form-check">
                                            <label>
                                                <Field
                                                type="radio"
                                                name="typeOfServiceState"
                                                value="Normal Wash + Iron"
                                                
                                                />
                                                Normal Wash + Iron
                                            </label>
                                            </div>

                                            <div className="form-check">
                                            <label>
                                                <Field
                                                type="radio"
                                                name="typeOfServiceState"
                                                value="Dry-Clean"
                                                
                                                />
                                                Dry-Clean
                                            </label>
                                            </div>

                                            <div className="form-check">
                                            <label>
                                                <Field
                                                type="radio"
                                                name="typeOfServiceState"
                                                value="Dry-Clean + Iron"
                                                
                                                />
                                                Dry-Clean + Iron
                                            </label>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label htmlFor="quantityState">No. of Clothes</label>
                                    <Field className="form-control" type="number" id="quantityState" name="quantityState" min="2" max="15"></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <div className="row">
                                        <div className="col-6">
                                            <button type="submit" className="btn btn-outline-warning" >Place</button>
                                        </div>
                                        <div className="col-6">
                                            <button type="reset" className="btn btn-outline-danger">Reset</button>
                                        </div>
                                    </div>
                                </fieldset>

                            </Form>
                        </Formik>
                    </div>
                </div>
                <br></br>
                {/* <h5><button onClick={this.backButton} >&laquo; Previous</button></h5> */}
            </div>
            </div>
         );
    }
}
 
export default Placeorder;