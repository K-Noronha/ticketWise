import React, { Component } from 'react';
import axios from "axios";

export default class SignUp extends Component {
    constructor(){
        super();
        this.signUpForm = React.createRef();
    }

    signUp = (e)=> {
        e.preventDefault(); 
        const thisForm = this.signUpForm.current;
        
        const userInfo = {
          "username" : thisForm.username.value,
          "email": thisForm.email.value,
          "password" : thisForm.password.value
      }

      for(let value in userInfo){
          if(!userInfo[value]){
              thisForm[value].focus();
              return;
          }
      }

      let postConfig = {
          method: "post",
          url: "http://localhost:8080/users/new",
          data: userInfo,
          headers: {
              "content-type": "application/json"
          }
      }
      axios(postConfig)
        .then((result)=>{
          this.props.setUser(result.data) 
          this.props.setLoginPg(false)
        })
        .catch(err=>console.log(err)) 
    }

  render() {
    return (
      <div>
        <form ref={this.signUpForm} onSubmit={this.signUp} className="form" >
            <div className="form--div">
                <label htmlFor="userNameId">USERNAME </label>
                <input type="text" name="username" id="userNameId" placeholder="Enter Your Username"/>
            </div>
            <div className="form--div">
                <label htmlFor="emailId">EMAIL </label>
                <input type="email" name="email" id="emailId" placeholder="Enter Email"/>
            </div>
            <div className="form--div">
                <label htmlFor="passwordId">PASSWORD</label>
                <input type="password" name="password" id="passwordId" placeholder="Enter Your Password"/>
            </div>
            <div className="form--buttons">
              <div onClick={()=>this.props.setLoginPg(false)}
                  className="cancel">Cancel</div>
              <button type="submit">SIGN UP</button>
            </div>
            
          </form>
      </div>
    )
  }
}
