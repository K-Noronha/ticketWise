import React, { Component } from 'react'
import EventList from './components/EventList';
import axios from 'axios';


export default class Categories extends Component {
  componentDidMount(){
    this.props.getEvents();
  }
  
    setCategory =(category)=>{
      axios.get(`http://localhost:8080/events/category/${category}`)
        .then(result=>{
          this.props.setEvents(result.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
  render() {
    return (
      <div>
        <div className="categories">        
            <h2 className="categories__choice" onClick={()=>{this.setCategory("Music")}}>Music</h2>
            <h2 className="categories__choice" onClick={()=>{this.setCategory("Community")}}>Community</h2>
            <h2 className="categories__choice" onClick={()=>{this.setCategory("Charity")}}>Charity</h2>
            <h2 className="categories__choice" onClick={()=>{this.setCategory("Other")}}>Other</h2>
        </div>
        <EventList events = {this.props.events}/>
      </div>
    )
  }
}
