import React, { Component } from "react";
import Star from "./Star";
import Dataservice from "../service/Dataservice";
import '../styles.css'
class Rating extends Component {
  static defaultProps = { max: 5 };
  constructor(props) {
    super(props);
    this.state = {
      username:this.props.match.params.username,
      orderId:this.props.match.params.orderId,
      dynamicValue: props.stars,
      value: 0
    };
    this._colors = {
      1: "#f44336",
      2: "#FF5722",
      3: "#FF9800",
      4: "#FFC107",
      5: "#FFEB3B"
    };
    this._meanings = {
      0: "No Rating 🚫",
      1: "Terrible 🤮",
      2: "Mediocre 😒",
      3: "Average 😐",
      4: "Solid 🙂",
      5: "Fantastic 🔥"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.back=this.back.bind(this)
    
  }
  handleClick(newValue) {
    this.setState({
      value: newValue,
      dynamicValue: newValue
    });
    let rating=String(this.state.dynamicValue)
   
    let order={
      "feedback":rating
    }
    Dataservice.AddFeedback(this.state.username,this.state.orderId,order)
   
   
    
  }
  handleMouseEnter(newValue) {
    this.setState({ dynamicValue: newValue });
  }

  handleMouseLeave(newValue) {
    this.setState({ dynamicValue: this.state.value });
  }

  back(){
    this.props.history.push(`/UserPastOrders/${this.state.username}`)
  }


  render() {
    const { dynamicValue, value } = this.state;
    const starSpans = [];
    const max = this.props.max;
    let count = dynamicValue;
    // for (let v = 1; v <= max; v++) {
    //   if (v <= dynamicValue) {
    //     count++;
    //   }
    // }
    for (let v = 1; v <= max; v++) {
      starSpans.push(
          <Star
            key={v}
            color={this._colors[count]}
            isFilled={v <= dynamicValue}
            value={v}
            handleHover={this.handleMouseEnter}
            handleHoverLeave={this.handleMouseLeave}
            handleClick={this.handleClick}
          />
        
      );
    }
    return (
      <div>
         
        <h1 style={{fontSize:'50px',textAlign:'center'}}>Please Rate Our Service</h1><br/>
        <div className="container" id="rating"  >
          <div style={{marginLeft:'45%'}}>
            <p style={{marginLeft:'4%'}}>{this._meanings[value]}</p>
            {starSpans}<br/><br/>
            
          </div>
          <button className="btn btn-info btn-sm" style={{marginLeft:'48%',marginBottom:'2%'}} onClick={this.back}>Submit</button>
       
        </div>
        
      </div>
    );
  }
}
export default Rating;
