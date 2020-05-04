import React from "react";
import Main from "./Main";
import Organization from "./Organization";
import Billing from "./Billing";
import AdminStripeApp from "./AdminStripeApp";
import Settings from "./Settings";
import Footer from "./Footer";
import AddOrg from '../containers/AddOrg';
import UpdateOrg from '../containers/UpdateOrg';
import { Route, Switch, Redirect, Link } from "wouter";
import logo from "../images/logo.png";

function AuthenticatedApp() {
    return (
        <div className="App">

            {/* <div className="d-flex" id="wrapper"> */}
            {/* <SideNav></SideNav> */}
            <Switch>
                <Route path="/">
                    <Main></Main>
                </Route>
                <Route path="/organization" component={Organization} />
                <Route path="/add-organization" component={AddOrg} />
                <Route path="/update-organization/:id,:name,:email">
                    {params => <UpdateOrg id={params.id} name={params.name} email={params.email} />}
                </Route>
                <Route path="/billing" component={Billing} />
                <Route path="/payment/:id">
                    {params => <AdminStripeApp id={params.id} />}
                </Route>
                <Route path="/settings/:email,:id">
                    {params => <Settings email={params.email} id={params.id} />}
                </Route>
                <Route path="/login">
                    <Redirect to="/" />
                </Route>

                <Route path="/:rest*">
                    <div className="not-found">
                        <img alt="logo" src={logo} />
                        <span>404, page not found!</span>
                        <Link to="/">Go to dashboard</Link>
                    </div>
                </Route>

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

export { AuthenticatedApp };
