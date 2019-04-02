import React, { Component } from 'react'

export default class EventCard extends Component {
  render() {
    let {title, category, location, eDate, ages, price, poster} = {...this.props.event}
    
    return (
      <div className="card">
        <img className="card__poster" src={poster} alt=""/>

        <div className="card__details">
            <h2>{title}</h2>
            <p>{category}</p>
            <p>{location}</p>
            <p>{eDate}</p>
            <p>{ages}</p>
            <p>${price}</p>
        </div>

        
      </div>
    )
  }
}
