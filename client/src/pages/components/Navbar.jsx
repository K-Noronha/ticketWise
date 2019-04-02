import React, { Component } from 'react'
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom";

export default class Navbar extends Component {
  
  render() {
    let user = this.props.user;

    return (
      <div className="nav">
        <Link to='/events'><img className="nav__img" src={logo} alt="ticketWise"/></Link>
        <div className="nav__links">
          <div><Link to='/events'><h4>Events</h4></Link></div>
          <div><Link to='/categories'><h4>Categories</h4></Link></div>
          <h4><Link to='/upload'>Upload</Link></h4>
          {user? <h4 onClick={()=>this.props.setUser(false)}>Sign Out</h4>
                :<h4 onClick={()=>this.props.setLoginPg(true)}>Log In</h4>}
        </div>
      </div>
    )
  }
}
