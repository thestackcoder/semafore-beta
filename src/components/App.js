import React from "react";
import "../stylesheets/App.css";
import Main from "./Main";
import Organization from "./Organization";
import Billing from "./Billing";
import Settings from "./Settings";
import Footer from "./Footer";
import Login from "../containers/Login";
import SideNav from './Sidebar/SideNav';
import addOrg from '../containers/AddOrg';
import updateOrg from '../containers/UpdateOrg';
import {
  BrowserRouter as Router
} from "react-router-dom";
import {
  Switch,
  Route
} from 'react-router';

function App() {
  return (
    <Router>
      <div className="App">

        <Route path="/login" component={Login} />

        {/* <div className="d-flex" id="wrapper"> */}
        {/* <SideNav></SideNav> */}

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/organization" component={Organization}></Route>
          <Route path="/add-organization" component={addOrg}></Route>
          <Route path="/update-organization" component={updateOrg}></Route>
          <Route path="/billing" component={Billing} />
          <Route path="/settings" component={Settings} />


          {/* <Route path="/organizational-dashboard" component={Omain} />
            <Route path="/employees" component={Employees} />
            <Route path="/organizational-billing" component={Obilling} />
            <Route path="/organizational-settings" component={OSettings} />
            <Route path="/screenshots" component={Screenshots} /> */}

        </Switch>
      </div>
      <Footer></Footer>
      {/* </div> */}
    </Router >
  );
}

export default App;
