import React from "react";
import Main from "./Main";
import Organization from "./Organization";
import Billing from "./Billing";
import Settings from "./Settings";
import Footer from "./Footer";
import AddOrg from '../containers/AddOrg';
import UpdateOrg from '../containers/UpdateOrg';
import { Route, Switch, Redirect } from "wouter";


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
                <Route path="/settings" component={Settings} />

                <Route path="/login">
                    <Redirect to="/" />
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

export { AuthenticatedApp };
