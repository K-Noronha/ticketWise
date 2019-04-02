import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class EventSuccess extends Component {
  render() {
    return (
      <div className="eventSuccess">
        <div className="eventSuccess__div">
          <h1>YOUR EVENT UPLOADED SUCESSFULLY!</h1>
          <h2>
            <Link  className="cancel" to={`/event/${this.props.newEvent}`}>
              CHECK IT OUT
            </Link>
          </h2>
          <h2>
            <Link to={'/upload'} className="cancel">
              UPLOAD NEW EVENT
            </Link>
          </h2>
        </div>
      </div>
    )
  }
}
