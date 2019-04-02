import React, { Component } from 'react'
import Ticket from './Ticket';

export default class AllTickets extends Component {
  render() {
    let tickets = this.props.tickets;
    return (
      <div className="allTickets">
        <div className="allTickets__div">
            <h1>All Tickets</h1>
            {tickets.map(item=>
                <Ticket tickets={item} key={item.id}/>
            )}
            <button onClick={this.props.closePopUp} className="allTickets__btn">Close</button>
        </div>
      </div>
    )
  }
}
