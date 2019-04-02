import React, { Component } from 'react'
import SignUp from './SignUp';
import LoginForm from './LoginForm';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            newUser: false
        }
        this.loginForm = React.createRef();
    }

    setStatus = (newUser) => {
        this.setState(
          {
            newUser
          }
        ); 
      }

  render() {
    const newUser = this.state.newUser;
    return (
      <div className="popup">
        <div className="popup--form">
          <div className="login">
              <h2 onClick={()=>this.setStatus(false)}
                  className={newUser? "login--tab" :"active"} >LOG IN</h2>
              <h2 onClick={()=>this.setStatus(true)}
                  className={newUser? "active":"login--tab"}>SIGN UP</h2>
          </div>

          {newUser? <SignUp setUser={this.props.setUser} setLoginPg={this.props.setLoginPg}/>
                    :<LoginForm setUser={this.props.setUser} setLoginPg={this.props.setLoginPg}/>}
        </div>    

      </div>
    )
  }
}
