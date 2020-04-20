import React from "react";
import Footer from "./Footer";
import { Login } from "../containers/Login";
import { Route, Switch, Redirect } from "wouter";
import logo from "../images/logo.png";

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
                <Route path="/settings/:email,:id">
                    <Redirect to="login" />
                </Route>
                <Route path="/billing">
                    <Redirect to="login" />
                </Route>
                <Route path="/organizational-dashboard" >
                    <Redirect to="login" />
                </Route>
                <Route path="/employees">
                    <Redirect to="login" />
                </Route>
                <Route path="/organizational-billing">
                    <Redirect to="login" />
                </Route>
                <Route path="/organizational-settings">
                    <Redirect to="login" />
                </Route>
                <Route path="/screenshots">
                    <Redirect to="login" />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/:rest*">
                    <div className="not-found"><img alt="logo" src={logo} />404, page not found!</div>
                </Route>

            </Switch>

            <Footer></Footer>
            {/* </div> */}

        </div>

    );
}

export { UnAuthenticatedApp };