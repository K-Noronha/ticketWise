import React, { Component } from 'react';
import axios from "axios";
import WrongCredentials from "./WrongCredentials";

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            WrongCredentials : false
        }
        this.loginForm = React.createRef();
    }

    signin = (e) => {
        e.preventDefault();
        const thisForm = this.loginForm.current;

        const userInfo = {
            "password" : thisForm.password.value,
            "username" : thisForm.username.value
        }

        for(let value in userInfo){
            if(!userInfo[value]){
                thisForm[value].focus();
                return;
            }
        }

        let postConfig = {
            method: "post",
            url: "http://localhost:8080/users/check",
            data: userInfo,
            headers: {
                "content-type": "application/json"
            }
        }
        axios(postConfig)
        .then((result)=>{
            this.props.setUser(result.data) 
            if(!result.data) {
                this.setState({
                    WrongCredentials: true
                })
                setTimeout(()=>{this.setState({
                    WrongCredentials: false
                })}, 2000)
            } else {
                this.props.setLoginPg(false)
            }
        })
        .catch(err=>console.log(err)) 
    }

  render() {
    return (
      <div>
          <form ref={this.loginForm} onSubmit={this.signin} className="form">
            <div className="form--div">
                <label htmlFor="userNameId">USERNAME </label>
                <input type="text" name="username" id="userNameId" placeholder="Enter Your Username"/>
            </div>
            <div className="form--div">
                <label htmlFor="passwordId">PASSWORD</label>
                <input type="password" name="password" id="passwordId" placeholder="Enter Your Password"/>
            </div>
            {this.state.WrongCredentials ? <WrongCredentials/>
                                :null}
            <div className="form--buttons">
                <div onClick={()=>this.props.setLoginPg(false)} 
                    className="cancel" >Cancel</div>
                <button type="submit">LOG IN</button>
            </div>
          </form>
      </div>
    )
  }
}
