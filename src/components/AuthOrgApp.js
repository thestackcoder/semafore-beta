import React from "react";
import Omain from './Omain';
import Employees from './Employees';
import Obilling from './Obilling';
import SideNav from './ClientSidebar/SideNav';
import OSettings from './OSettings';
import Screenshots from './Screenshots';
import StripeApp from './StripeApp';
import AddEmployee from '../containers/AddEmployee';
import UpdateEmployee from '../containers/UpdateEmployee';
import logo from "../images/logo.png";
import { Route, Switch, Redirect, Link } from "wouter";

function AuthOrgApp() {
    return (
        <div className="App">
            <div className="d-flex" id="wrapper">
                <SideNav></SideNav>

                {/* <div className="d-flex" id="wrapper"> */}
                {/* <SideNav></SideNav> */}
                <Switch>
                    <Route path="/">
                        <Omain></Omain>
                    </Route>
                    <Route path="/organizational-dashboard" component={Omain} />

                    <Route path="/employees/:id">
                        {params => <Employees id={params.id} />}
                    </Route>

                    <Route path="/organizational-billing/:id">
                        {params => <Obilling id={params.id} />}
                    </Route>

                    <Route path="/organizational-settings/:id">
                        {params => <OSettings id={params.id} />}
                    </Route>

                    <Route path="/screenshots" component={Screenshots} />

                    <Route path="/login">
                        <Redirect to="/organizational-dashboard" />
                    </Route>

                    <Route path="/payment/:id">
                        {params => <StripeApp id={params.id} />}
                    </Route>

                    <Route path="/add-employee/:id">
                        {params => <AddEmployee id={params.id} />}
                    </Route>

                    <Route path="/update-employee/:phone,:name">
                        {params => <UpdateEmployee phone={params.phone} name={params.name} />}
                    </Route>

                    <Route path="/:rest*">
                        <div className="not-found"><img alt="logo" src={logo} /> 404, page not found!</div>
                    </Route>
                    <Route path="/:rest*">
                        <div className="not-found">
                            <img alt="logo" src={logo} />
                            <span>404, page not found!</span>
                            <Link to="/login">Go to Login Page</Link>
                        </div>
                    </Route>

                </Switch>

            </div>

            {/* <Footer></Footer> */}
            {/* </div> */}
        </div>
    );
}

export { AuthOrgApp };
