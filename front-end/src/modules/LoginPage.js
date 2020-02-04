import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Dataservice from '../service/Dataservice';


class Loginpage extends Component {
    constructor(props){
        super(props)
        this.state = ({
            username:'',
            password:''
        })
        this.onSubmit = this.onSubmit.bind(this)
        this.handlePassword=this.handlePassword.bind(this)
    }
    onSubmit(value) {
        console.log(value);
        if(value.username === 'admin' & value.password === 'admin'){
            this.props.history.push('/adminPage')
        }
        else if(value.username === 'deliver' & value.password === 'deliver'){
            this.props.history.push('/deliverPage')
        }
        else if(value.username === 'Rahul' & value.password === 'rahul'){
            this.props.history.push(`/adminPage`)
        }
        else if(value.username === '' & value.password === ''){
            alert("Please enter your Username and Password!")
        }
        else{
            Dataservice.checkLogin(value.username,value.password).then(response =>{
                if(response.data===true){
                    //localStorage.setItem("username")
                    
                    this.props.history.push(`/userPage/${value.username}`)
                }
                else{
                    alert("invalid credentials")
                }
            })
        }
    }

   

    handlePassword(){
        this.props.history.push('/PasswordPage')

    }

    register = ()=>{
        this.props.history.push("/RegisterPage")
    }
    
    render() { 
        let {username,password} = this.state
        return ( 
            <div className="container">
                <div style={{minHeight:100}}></div>
                
                <div className="card float-right" style={{width:"300",height:"600",background:"linear-gradient(to right, #50c9c3, #96deda)"}}>
                    <div className="card-head">
                        <center><h2>Login Form</h2></center>
                    </div>
                    <div className="card-body">
                        <Formik initialValues = {{username,password}}
                        enableReinitialize = {true}
                        onSubmit = {this.onSubmit}
                        validateOnChange = {false}
                        validateOnBlur = {false}
                        validate = {this.loginValidate}>

                            <Form>

                                <fieldset className="form-group">
                                    <label htmlFor="username">Username</label>
                                    
                        
                                    <Field className = "form-control " type = "text" name = "username" id="username" placeholder="Username"></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field className = "form-control" type = "password" id="password" name = "password" placeholder="password"></Field>
                                    <div className="row">
                                        <div className="col-6">
                                            <button type="button" className="btn btn-link" onClick={this.register} ><small>Register</small></button>
                                        </div>
                                        <div className="col-6">
                                            <button type="button" className="btn btn-link " onClick={this.handlePassword}  ><small>Forgot Password?</small></button>
                                        </div>
                                    </div>
                                </fieldset>
                                
                                <div className="row">
                                    <div className="col-7">
                                        <button type="submit" className="btn btn-success" >Login</button>
                                    </div>
                                    <div className="col-4"> 
                                        <button type="reset"  className="btn btn-danger">Reset</button>
                                    </div>
                                </div>
                            </Form>

                        </Formik>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Loginpage;