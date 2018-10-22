import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';

let cookies = new Cookies();
var message;

class login extends Component {

onLoad()
{
  if(!(cookies.get("message")=="null"))
  {
    document.getElementById('message').innerHTML = cookies.get('message') || "";
    message = cookies.get('message');
  }
}

componentDidMount() {
  window.addEventListener('load', this.onLoad);
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
    var response = JSON.parse(xhttp.response);
    console.log(response.role);
    //cookies.set('message', response.role, { path: '/login2' });
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "message =" + response.role + ";" + expires + ";path=/";

    if(!(response.role=="null"))
     {
      document.getElementById('message').innerHTML = cookies.get('message');
     }
     }
}


  render() {
    
    return (
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
      
    );
  }
}

export default login;
