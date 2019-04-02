import React, { Component } from 'react'
import AllTickets from './AllTickets';
import axios from 'axios';
import tickets from "../../assets/tickets.png"

export default class TicketBtn extends Component {
    state = {
        popUp : false,
        tickets: ""
    }

    getTickets=()=>{
        axios.get(`http://localhost:8080/ticket/all/${this.props.user.id}`)
        .then(result=>{
            this.setState({
                tickets: result.data,
                popUp:true
            })
          }
        )
        .catch(err=>{
            console.log(err)
        })

    }

    displayTickets = () => {
        this.getTickets();
    }

    closePopUp=()=>{
        this.setState({
            popUp : false
        })
    }
  
  render() {

    return (
        <div>
            {this.state.popUp? <AllTickets closePopUp={this.closePopUp} tickets={this.state.tickets} /> 
                            : null}
            <button onClick={this.displayTickets} className="ticketBtn"> 
                <img src={tickets} alt=""/>
            </button>
        </div>
      
    )
  }
}
