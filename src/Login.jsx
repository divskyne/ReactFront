import React from 'react';
import { Redirect } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Cookies from 'universal-cookie';

let cookies = new Cookies();
var message;

class Login extends React.Component {

  constructor() {

    super();

    this.state = {
      redirectToReferrer: false
    }
    this.login = this.login.bind(this);
  }


onLoad()
{
  document.getElementById('message').innerHTML = cookies.get('message') || "";
  message = cookies.get('message');
}

componentDidMount() {
  window.addEventListener('load', this.onLoad);
}

  login() {

    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  handleSubmit(event) {

    var emailstr =  document.getElementById('uname').value;
    var passstr = document.getElementById('pword').value;
 
    const url = "http://localhost:8090/api/login"
    
    var user = JSON.stringify({
        "email":emailstr,
        "password":CryptoJS.MD5(passstr).toString()
    })
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    xhttp.responseType = 'text';
    xhttp.send(user);
 
    xhttp.onload = ()=>{
      document.getElementById('message').innerHTML=xhttp.responseText;
     console.log(xhttp.responseText);
      }
 }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;
    message = cookies.get('message')

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <form onSubmit={this.handleSubmit}>
        <label>
          UserName:
          <input type="text" name="uname" id = "uname" />
        </label>
        <label>
          Password:
          <input type="text" name="pword" id="pword"/>
        </label>
        <input type="submit" value="Submit" />
        <p id="message">{message}</p>
      </form>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }


}

/* A fake authentication function */

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  }
};


export default Login