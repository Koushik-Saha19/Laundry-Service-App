import React, { Component } from 'react';
import { Formik, Form,Field, ErrorMessage  } from 'formik';
import Dataservice from '../service/Dataservice'



class Registrationform extends Component {
    constructor(props){
        super(props)
        this.state={
            custName:'',
            custUsername:'',
            custSociety:'',
            custEmail:'',
            custPhone:'',
            custSecurityanswer:'',
            custPassword:'',
            confirmPassword:''
        }
        this.validateForm=this.validateForm.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleBack=this.handleBack.bind(this)
        
    }

    validateForm(values){
        let errors={}
        if(!values.custName){
            errors.custName="Enter your name"
        }
        else if(/[^a-zA-Z]/.test(values.custName)){
            errors.custName="Name should contain alphabets"
        }

        else if(!values.custUsername){
            
            errors.custUsername="Enter your Username"
        }

        else if(values.custUsername.length<6){
            errors.custUsername="Username should be min 6 characters"
        }

        else if(!values.custSociety){
            errors.custSociety="Enter your society"
        }

        else if(!values.custEmail) {
            errors.custEmail = 'Enter your email';
          } 
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.custEmail)) {
            errors.custEmail = 'Invalid email address';
          }

        
        else if(values.custPhone.length!==10){
            errors.custPhone="Enter valid number" 
        }

        else if(!/[^a-zA-Z]/.test(values.custPhone)){
            errors.custPhone="Phone number should be in numerics"
        }

        else if(!values.custSecurityanswer){
            errors.custSecurityanswer="Security answer should not be empty"
        }
        else if(values.custPassword.length<6){
            errors.custPassword="Enter password with min 6 char"
        }
        else if(values.custPassword!==values.confirmPassword){
            errors.confirmPassword="Passwords do not match"
        }
        return errors;
        

    }

    handleSubmit(values){
        console.log('submit')
        let customer={
            custName:values.custName,
            custUsername:values.custUsername,
            custSociety:values.custSociety,
            custEmail:values.custEmail,
            custPhone:values.custPhone,
            custSecurityanswer:values.custSecurityanswer,
            custPassword:values.custPassword
        }

        Dataservice.addCustomer(customer).then(response =>
            {
            console.log(response.data);
            if(response.data===false){
                alert('select another username')
            }
            else{
                console.log('saved')
                alert("Successfully registered. You'll be redirected to login page")
                this.props.history.push('/')
            }
        })
            

        
      
    }

    handleBack(){
        this.props.history.push('/')
    }


   
    render() {
        let {custName,custUsername,custSociety,custEmail,custPhone,custSecurityanswer,custPassword,confirmPassword}=this.state
        return (
            <div>
                <center>
                    <div className="card" style={{backgroundColor:"#ebab34"}}>
                        <center>
                        <div className="card-body" style={{backgroundColor:"beige",width:700,height:900,alignContent:"center"}}>
                            <h1>Registration Form</h1>
                            <Formik initialValues={{custName,custUsername,custSociety,custEmail,custPhone,custSecurityanswer,custPassword,confirmPassword}}
                            validateOnBlur={false}  validateOnChange={false}  validate={this.validateForm}
                            onSubmit={this.handleSubmit}>
                                <Form>
                                
                                <fieldset className="form-group">
                                    <label htmlFor="custName">Name</label>
                                     <Field className="form-control col-sm-5" type="text" id="custName" name="custName" placeholder="Name" iconName="ios-lock" >
                                        
                                    </Field> 
                                    
                                    
                                </fieldset>
                                <ErrorMessage name="custName" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label htmlFor="custUsername">Username</label>
                                    <Field className="form-control col-sm-5" type="text" id="custUsername" name="custUsername" placeholder="Username" ></Field>
                                </fieldset>

                                <ErrorMessage name="custUsername" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>

                                <fieldset className="form-group ">
                                    <label htmlFor="custSociety">Society</label>
                                    <Field className="form-control col-sm-5" type="text" id="custSociety" name="custSociety" placeholder="Society" ></Field>
                                </fieldset>
                                <ErrorMessage name="custSociety" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label htmlFor="custEmail">Email</label>
                                    <Field className="form-control col-sm-5" type="text" id="custEmail" name="custEmail" placeholder="Email" ></Field>
                                </fieldset>
                                <ErrorMessage name="custEmail" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label htmlFor="custPhone">Phone</label>
                                    <Field className="form-control col-sm-5" type="text"id="custPhone" name="custPhone" placeholder="Phone" ></Field>
                                </fieldset>
                                <ErrorMessage name="custPhone" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label htmlFor="custSecurityanswer">Security question</label>
                                    <Field className="form-control col-sm-5" type="text" id="custSecurityanswer" name="custSecurityanswer" placeholder="your father's birth place?" ></Field>
                                </fieldset>

                                <ErrorMessage name="custSecurityanswer" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>


                                <fieldset className="form-group">
                                    <label htmlFor="custPassword">Password</label>
                                    <Field className="form-control col-sm-5" type="password" id="custPassword" name="custPassword" placeholder="Password"  ></Field>
                                </fieldset>
                                <ErrorMessage name="custPassword" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label htmlFor="confirmPassword">Confirm password</label>
                                    <Field className="form-control col-sm-5" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" ></Field>
                                </fieldset>
                                <ErrorMessage name="confirmPassword" component="div"
                                    className="alert alert-warning col-sm-5"></ErrorMessage>
                                <div className="row" style={{marginLeft:'217px'}}>
                                <button type="submit" className="btn btn-outline-primary" style={{marginLeft:'-20px'}} >Register</button>
                                <button type="reset" className="btn btn-outline-warning" style={{marginLeft:'30px'}}>Reset</button>
                                <button className="btn btn-outline-secondary" onClick={this.handleBack} style={{marginLeft:'30px'}} >Back</button>
                                </div>
                                </Form>
                            </Formik>
                            
                            <a href="/LoginPage">Already a member?</a>
                            
                        </div>
                        </center>
                    </div>
                </center>
                
            </div>
        );
    }
}

export default Registrationform;