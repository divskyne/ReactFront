import React, { Component } from 'react';

var CryptoJS = require("crypto-js");


class Adduser extends Component {

  handleSubmit(event) {
    var emailstr =  document.getElementById('uname').value;
    var passstr = document.getElementById('pword').value;
    var name = document.getElementById('name').value;
    var role = document.getElementById('role').value;
    var state = document.getElementById('state').value;

 
    const url = "http://localhost:8090/api/people"
    
    var user = JSON.stringify({
      "email": emailstr,
      "name": name,
      "role": role,
      "password":CryptoJS.MD5(passstr).toString(),
      "cv": " ",
      "state": state,
      "docType": null
    })
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader('Access-Control-Allow-Origin','*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    xhttp.responseType = 'text';
    xhttp.send(user);
 
    xhttp.onload = ()=>{
     console.log(xhttp.responseText);
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
        Name:
        <input type="text" name="name" id = "name" />
      </label>
      <label>
        Role:
        <input type="text" name="role" id = "role" />
      </label>
      <label>
        Password:
        <input type="text" name="pword" id="pword"/>
      </label>
      <label>
        State:
        <input type="text" name="state" id = "state" />
      </label>
      <input type="submit" value="Submit" />
    </form>
      );
  }
}

export default Adduser;
