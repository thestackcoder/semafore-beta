import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from 'axios';


class App extends Component {

  componentDidMount() {
    axios.get('/.netlify/functions/readOrganization')
      .then((data) => {
        // setUserSession(response.data.token, response.data.user);
        var res = data.data.data;
        // let arr = res.map(obj => Object.values(obj));
        this.setState({ loading: false, msg: data.data.msg, orgs: res });
        console.log(this.state.orgs);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteRow = (id) => {
    console.log(id);
    axios.delete('/.netlify/functions/deleteOrganization', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        "_id": id
      }
    })
      .then((data) => {
        // setUserSession(response.data.token, response.data.user);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={() => this.deleteRow("5e85c32603da8000073351ba")} className="btn btn-danger btn-sm">Delete</button>
        </header>
      </div>
    )
  }
}

export default App
