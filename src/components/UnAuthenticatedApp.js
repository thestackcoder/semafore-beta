import React from "react";
import Footer from "./Footer";
import { Login } from "../containers/Login";
// import {
//     Redirect
// } from "react-router-dom";
// import {
//     Switch,
//     Route
// } from 'react-router';
import { Route, Switch, Redirect } from "wouter";


function UnAuthenticatedApp() {
    return (
        <div className="App">

            {/* <div className="d-flex" id="wrapper"> */}
            {/* <SideNav></SideNav> */}

            <Switch>
                <Route path="/">
                    <Redirect to="login" />
                </Route>
                <Route path="/organization">
                    <Redirect to="login" />
                </Route>
                <Route path="/add-organization">
                    <Redirect to="login" />
                </Route>
                {/* <Route path="/update-organization/:params">
                    <Redirect to="login" />
                </Route> */}
                <Route path="/billing">
                    <Redirect to="login" />
                </Route>
                <Route path="/settings">
                    <Redirect to="login" />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/:rest*">404, not found!</Route>

                {/* <Route path="/organizational-dashboard" component={Omain} />
            <Route path="/employees" component={Employees} />
            <Route path="/organizational-billing" component={Obilling} />
            <Route path="/organizational-settings" component={OSettings} />
            <Route path="/screenshots" component={Screenshots} /> */}

            </Switch>

            <Footer></Footer>
            {/* </div> */}

        </div>

    );
}

export { UnAuthenticatedApp };