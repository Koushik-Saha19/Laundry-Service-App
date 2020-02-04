import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactUs extends Component {
    constructor(props) {
        super(props);

        this.backButton = this.backButton.bind(this)
    }

    componentWillMount() {

    }

    backButton(){
        this.props.history.goBack()
            }

    render() {
        return (
            
                 
            <div className="conatiner">
                <center>
                    <div className="card" style={{width:'30%',marginTop:'10%'}}>
                        <div className="card-body" style={{background:'linear-gradient(to right, #50c9c3, #96deda)'}}>
                            <h1 style={{marginTop:'10%'}}>Reach Us At:</h1>
                            <address>DXC Technology DGS Campus<br/>
                                    
                                    Electronic City Phase-1<br/>
                                    Bangalore, 560 100<br/>
                                    
                                    <b>Phone:</b> (+91) 99099 99099<br/>
                                    <b>Email:</b> support@wascherei.com
                            </address>
                        </div>
                    </div>
                    <h5><button onClick={this.backButton} style={{color:"green"}}>&#8249; Previous</button></h5> 
                </center>
         
            </div>
  
        );
    }
}

ContactUs.propTypes = {

};

export default ContactUs;