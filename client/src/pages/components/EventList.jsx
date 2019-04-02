import React, { Component } from 'react';
import EventCard from './EventCard';
import {Link} from 'react-router-dom';

export default class EventList extends Component {
  render() {
    let events = this.props.events;
    return (
        <div className="events">
          {events.map(item=>
            <Link to={`/event/${item.id}`} key={item.id}>
                <EventCard event={item}
                        key={item.id}/>
            </Link>)
          }
        </div>
    )
  }
}
