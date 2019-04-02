import React, { Component } from 'react'

export default class NoTickets extends Component {
  render() {
    return (
      <div className="noTickets">
        <div className="noTickets__div">
          <h2>Sorry!</h2>
          <h2>No more tickets available.</h2>
        </div>  
      </div>
    )
  }
}
