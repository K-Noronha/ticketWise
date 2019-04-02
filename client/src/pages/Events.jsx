import React, { Component } from 'react';

import EventList from './components/EventList';

export default class Events extends Component {
  componentDidMount(){
    this.props.getEvents();
  }

  render() {
    return (
        <div>
          <EventList events={this.props.allEvents}/>
        </div>
    )
  }
}

