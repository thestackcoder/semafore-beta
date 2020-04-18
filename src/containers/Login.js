import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "../stylesheets/App.css";
import logo from "../images/logo.png";
import back from "../images/Background.png";
import axios from 'axios';
import { useHistory } from "react-router-dom";
// import { setUserSession } from '../utils/Common';


class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = () => {
    // setError(null);

    axios({
      method: 'post',
      url: '/.netlify/functions/login',
      headers: {
        accept: 'Accept: application/json',
      },
      data: {
        "email": this.state.email,
        "password": this.state.password
      }
    })
      .then(response => {
        // setUserSession(response.data.token, response.data.user);
        console.log(response.data);

      })
      .catch(error => {
        // if (error.response.status === 401) setError(error.response.data.message);
        // else setError("Something went wrong. Please try again later.");
        console.log(error)
      });
  }


  render() {
    return (
      <div className="login-box">
        <img src={back} alt="logo" className="login-back" />
        <div className="Login col-md-4 col-xs-12 col-lg-4 col-sm-8 m-auto">
          <div className="m-auto img-box"><img className="login-logo" src={logo} alt="semafore-logo" /><span>SemaFore</span></div>
          <form>
            <FormGroup controlId="email">
              <FormControl
                autoFocus
                type="email"
                placeholder="Username/Email"
                onChange={event => this.setState({ email: event.target.value })}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormControl
                placeholder="Password"
                type="password"
                onChange={event => this.setState({ password: event.target.value })}
              />
            </FormGroup>

            {/* {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> */}
            <Button className="btn btn-default btn-block" onClick={this.handleLogin}>
              Login
            </Button>


          </form>
        </div>
      </div>
    );
  }
}


export default Login;
