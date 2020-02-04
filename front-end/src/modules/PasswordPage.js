import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Dataservice from '../service/Dataservice'
class PasswordPage extends Component {

    constructor(props){
        super(props)
        this.state={
            custUsername:'',
            custPassword:'',
            confirmPassword:'',
            custSecurityanswer:''
        }
        this.handlePassword=this.handlePassword.bind(this)
        this.handleBack=this.handleBack.bind(this)
    }

    handleBack(){
        this.props.history.push('/')
    }

    handlePassword(values){
        let errors={}
        if(values.custPassword===values.confirmPassword){

        Dataservice.changePassword(values.custUsername,values.custSecurityanswer,values.custPassword).then(response=>{
            console.log(response.data)
            if(response.data==true){
                alert("password changed successfully")
                this.props.history.push('/')
                
            }
            else{
                alert("Invalid credentials")
                
            }

        })

    }
    else{
        alert('passwords donot match')
    }
}
    render() {
        let{custUsername,custSecurityanswer,custPassword,confirmPassword}=this.state
        return (
            <div className="container">
                <Formik initialValues = {{custUsername,custSecurityanswer,custPassword,confirmPassword}}
                        enableReinitialize = {true}
                        onSubmit = {this.onSubmit}
                        validateOnChange = {false}
                        validateOnBlur = {false}
                        onSubmit={this.handlePassword}>
                    <Form>

                    <fieldset className="form-group">
                        <label htmlFor="custUsername">Username</label>
                        <Field className="form-control col-sm-5" type="text" id="custUsername" name="custUsername" placeholder="Username" ></Field>
                    </fieldset>

                    <fieldset className="form-group">
                        <label htmlFor="custSecurityanswer">Security Question</label>
                        <Field className="form-control col-sm-5" type="text" id="custSecurityanswer" name="custSecurityanswer" placeholder="Father's birth place?" ></Field>
                    </fieldset>

                    <fieldset className="form-group">
                        <label htmlFor="custPassword">Password</label>
                        <Field className="form-control col-sm-5" type="password" id="custPassword" name="custPassword" placeholder="Password"  ></Field>
                    </fieldset>

                    <fieldset className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <Field className="form-control col-sm-5" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" ></Field>
                    </fieldset>

                    
                    <div>
                    <button type="submit" className="btn btn-outline-success" style={{marginRight:'30px'}} >Update</button>
                    <button className="btn btn-outline-secondary" onClick={this.handleBack}>Back</button>
                    </div>
                        
                    </Form>
                </Formik>
                
            </div>
        );
    }
}

export default PasswordPage;