import React, { Component } from 'react';
import axios from 'axios';
import NoTickets from './components/NoTickets';
import BoughtTicket from './components/BoughtTicket';

export default class EventPg extends Component {
  state = {
    event : {},
    noTickets: false,
    tickets: false
  }

  componentDidMount(){
    axios.get(`http://localhost:8080/events/${this.props.match.params.id}`)
    .then(result=>{
      this.setState(
        {
          event : result.data
        }
      ); 
    })
    .catch(err=>{
        console.log(err);
    })
  }

  buyTicket=()=>{
    let ticket = {
      "event_id" : this.state.event.id, 
      "user_id" : this.props.user.id,
      "code" : `Name: ${this.props.user.username} Event: ${this.state.event.title}`
    }
  
    let postConfig = {
      method: "post",
      url: "http://localhost:8080/ticket/buy",
      data: ticket,
      headers: {
          "content-type": "application/json"
      }
    }
    axios(postConfig)
      .then((result)=>{
        if (!result.data) {
          this.setState({
            noTickets: true
        })
        setTimeout(()=>{this.setState({
            noTickets: false
        })}, 2000)
        } else {
          this.setState({
            tickets: true
        })
        setTimeout(()=>{this.setState({
            tickets: false
        })}, 2000)

        }

      })
      .catch(err=>console.log(err)) 
  
  }

  render() {
    let event = this.state.event
    return (
      <div className="eventPg">
        <img className="eventPg__img" src={event.poster} alt=""/> 
        <div>
          <h1>{event.title}</h1>
          <h3>{event.hostedBy}</h3>
          <p>{event.eDate} || {event.time}</p>
          <p>{event.address} || {event.location}</p>
          <p>{event.category}</p>
          <p>{event.ages}</p>
          <p>{event.description}</p>
          <p>${event.price}</p>          
          {this.props.user? <button onClick={this.buyTicket} >BUY TICKET</button>
                  :<button onClick={()=>this.props.setLoginPg(true)}>Log In</button>}
        </div>
        {this.state.noTickets? <NoTickets/> : null }
        {this.state.tickets?<BoughtTicket/> : null }
      </div>
    )
  }
}
