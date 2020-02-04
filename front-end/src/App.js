import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Switch,Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {  Navbar } from 'react-bootstrap'
import Loginpage from './modules/LoginPage';
import Userpage from './modules/UserPage';
import Adminpage from './modules/AdminPage';
import Deliverpage from './modules/DeliverPage';
import Placeorder from './modules/PlaceOrder'
import Registrationform from './modules/Registrationform';
import PasswordPage from './modules/PasswordPage';
import AdminOnGoingOrders from './modules/AdminOnGoingOrders'
import AdminPastOrders from './modules/AdminPastOrders'
import UserCurrentOrders from './modules/UserCurrentOrders'
import UserPastOrders from './modules/UserPastOrders'
import OutForDelivery from './modules/OutForDelivery';
import OutForPickup from './modules/OutForPickup'
import AdminOrderUpdate from './modules/AdminOrderUpdate'
import UserPickUpUpdate from './modules/UserPickUpUpdate'
import UserDeliveryUpdate from './modules/UserDeliveryUpdate'
import Rating from './modules/Rating'
import ContactUs from './modules/ContactUs'
import './App.css'


class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div style={{background:'linear-gradient(to right, #abbaab, #ffffff)',height:'160vh'}}>
        <Navbar style={{background:'linear-gradient(to right, #485563, #29323c)'}} expand='lg'>
          <Navbar.Brand style={{color:'white'}} href="/">Wäscherei</Navbar.Brand>

        </Navbar>
        
        <Router>
            <Switch>
              <Route exact path = '/' component = {Loginpage}/>
              <Route exact path = '/AdminOnGoingOrders' component={AdminOnGoingOrders}></Route>
              <Route exact path = '/userPage/:username' component = {Userpage}/>
              <Route exact path = '/adminPage' component = {Adminpage}/>
              <Route exact path = '/deliverPage' component = {Deliverpage}/>
              <Route exact path = '/placeOrder/:username' component = {Placeorder}/>
              <Route exact path = '/RegisterPage' component={Registrationform}></Route>
              <Route exact path = '/LoginPage' component={Loginpage}></Route>
              <Route exact path = '/PasswordPage' component={PasswordPage}></Route>
              <Route exact path = '/Rating/:username/:orderId' component={Rating}></Route>
              <Route exact path = '/AdminPastOrders' component={AdminPastOrders}></Route>
              <Route exact path = '/UserCurrentOrders/:username' component={UserCurrentOrders}></Route>
              <Route exact path = '/UserPastOrders/:username' component={UserPastOrders}></Route>
              <Route exact path = '/OutForDelivery' component={OutForDelivery}></Route>
              <Route exact path = '/OutForPickup' component={OutForPickup}></Route>
              <Route exact path = '/AdminOrderUpdate/:custUsername/:orderId/:typeOfService/:quantity/:orderStatus' component={AdminOrderUpdate}></Route>
              <Route exact path = '/DeliveryUpdate/:custUsername/:orderId/:typeOfService/:quantity/:orderStatus' component={UserDeliveryUpdate}></Route>
              <Route exact path = '/PickUpUpdate/:custUsername/:orderId/:typeOfService/:quantity/:orderStatus' component={UserPickUpUpdate}></Route>
              <Route exact path = '/ContactUs' component={ContactUs}></Route>







            </Switch>
        </Router>
        

      </div>
     );
  }
}
 
export default App;