import axios from 'axios'
const PRODUCT_API_URL='http://localhost:8001'

class Dataservice{
    addCustomer(customer){
        return axios.post(`${PRODUCT_API_URL}/addCustomer`,customer)
    }

   changePassword(username,answer,password){
       return axios.put(`${PRODUCT_API_URL}/changePassword/${username}/${answer}/${password}`,)
   }

   checkLogin(username,password){
       return axios.get(`${PRODUCT_API_URL}/checkUsernamePassword/${username}/${password}`)
   }

   placeOrder(username,order){
       console.log('called')
       return axios.post(`${PRODUCT_API_URL}/addOrder/${username}`,order)

   }

   AdminOnGoingOrders(){
       return axios.get(`${PRODUCT_API_URL}/admin/PresentOrder`)
   }

   AdminPastOrders(){
       return axios.get(`${PRODUCT_API_URL}/admin/PastOrder`)
   }

   UserCurrentOrders(custUsername){
       return axios.get(`${PRODUCT_API_URL}/${custUsername}/PresentOrder`)
   }

   UserPastOrders(custUsername){
       return axios.get(`${PRODUCT_API_URL}/${custUsername}/PastOrder`)
   }

   OutForDelivery(){
       return axios.get(`${PRODUCT_API_URL}/deliver/OutForDelivery`)
   }

   OutForPickup(){
       return axios.get(`${PRODUCT_API_URL}/deliver/OutForPickUp`)
   }

   UpdateOrder(username,orderId,order){
       return axios.put(`${PRODUCT_API_URL}/admin/updateOrder/${username}/${orderId}`,order)
   }

   DeleteOrder(username,orderId){
       return axios.delete(`${PRODUCT_API_URL}/admin/deleteOrder/${username}/${orderId}`)
   }

   AddFeedback(username,orderId,order){
       return axios.put(`${PRODUCT_API_URL}/addFeedback/${username}/${orderId}`,order)
   }
}

export default new Dataservice()