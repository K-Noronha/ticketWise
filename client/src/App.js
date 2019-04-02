import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import './styles/styles.scss';
import axios from 'axios';
import Navbar from "./pages/components/Navbar"
import Events from './pages/Events';
import Footer from './pages/components/Footer';
import Upload from './pages/Upload';
import EventPg from './pages/EventPg';
import Categories from './pages/Categories';
import Login from './pages/components/Login';
import TicketBtn from './pages/components/TicketBtn';

class App extends Component {
  state = {
    events : [],
    loginpg: false,
    user: false
  }

  getEvents = () => {
    axios.get("http://localhost:8080/events/all")
      .then(result=>{
        this.setEvents( result.data);
      })
      .catch(err=>{
          console.log(err);
      })
  }

  setEvents = (events) => {
    this.setState(
      {
        events 
      }
    ); 
  }

  setUser = (user) => {
    this.setState(
      {
        user 
      }
    ); 
  }

  setLoginPg = (loginpg) => {
    this.setState(
      {
        loginpg
      }
    ); 
  }

  render() {
    let user = this.state.user;
    return (
      <Router>
        <div className="App">
          <Navbar user={user} setUser={this.setUser} setLoginPg={this.setLoginPg}/>

          {this.state.loginpg? <Login setUser={this.setUser} setLoginPg={this.setLoginPg}/>
                              : null}

          {user? <TicketBtn user={user}/> : null}
          
          <Switch>
            <Route path="/categories"
                   render={()=>{return <Categories events={this.state.events}
                                                    getEvents={this.getEvents}
                                                    setEvents={this.setEvents}/>}}/>
            <Route path="/upload" component={Upload}/>
            <Route path="/event/:id" 
                   render={ (props)=>{return <EventPg {...props}
                                          user={this.state.user} 
                                          setLoginPg={this.setLoginPg}/> } } />
            <Route path="/events"
                   render={(props)=>{return <Events {...props} allEvents={this.state.events} 
                                                      getEvents={this.getEvents}/>} } />
            <Redirect to="/events"/>
          </Switch>
          
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
