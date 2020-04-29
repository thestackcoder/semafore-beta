import React, { Component } from 'react'
import SideNav from './Sidebar/SideNav';
import "../stylesheets/togglecheck.css";
import StripeApp from './StripeApp';

class Payment extends Component {
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideNav></SideNav>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        <div className="das m-auto">Subscription</div>
                    </nav>
                    <div className="container">
                        <div className="row mt-1">
                            <div className="col-12">
                                <div className="firm-box">
                                    <StripeApp></StripeApp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default Payment;
