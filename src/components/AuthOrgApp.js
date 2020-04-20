import React from "react";
import Omain from './Omain';
import Employees from './Employees';
import Obilling from './Obilling';
import OSettings from './OSettings';
import Screenshots from './Screenshots';
import Footer from "./Footer";
import logo from "../images/logo.png";
import { Route, Switch, Redirect } from "wouter";

function AuthOrgApp() {
    return (
        <div className="App">

            {/* <div className="d-flex" id="wrapper"> */}
            {/* <SideNav></SideNav> */}
            <Switch>
                <Route path="/organizational-dashboard" component={Omain} />
                <Route path="/employees" component={Employees} />
                <Route path="/organizational-billing" component={Obilling} />
                <Route path="/organizational-settings" component={OSettings} />
                <Route path="/screenshots" component={Screenshots} />

                <Route path="/login">
                    <Redirect to="/organizational-dashboard" />
                </Route>

                <Route path="/:rest*">
                    <div className="not-found"><img alt="logo" src={logo} /> 404, page not found!</div>
                </Route>

            </Switch>

            {/* <Footer></Footer> */}
            {/* </div> */}
        </div>
    );
}

export { AuthOrgApp };
