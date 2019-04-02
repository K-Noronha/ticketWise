import React, { Component } from 'react';
import {QRCode} from "react-qr-svg";

export default class Ticket extends Component {
  render() {
    let code = this.props.tickets.code;
    return (
        <div className="ticket">

          <QRCode 
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 150 }}
            value={code} />

        <div className="ticket__div" >
          <div className="ticket__text">
            <h2>{this.props.tickets.event.title}</h2>
            <h3>{this.props.tickets.event.eDate}</h3>
            <h3>{this.props.tickets.event.time}</h3>
            <h3>{this.props.tickets.event.address}</h3>
          </div>
          <img className="ticket__img" src={this.props.tickets.event.poster} alt=""/>
        </div>
      </div>
    )
  }
}
