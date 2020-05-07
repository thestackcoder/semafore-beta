import React, { Component } from 'react';
import "../stylesheets/Sidebar.css";
import screenshots from "../images/screensht-green.png";
import employees from "../images/employee-green.png";
import bar_chart from "../images/bar_chart.png";

class Main extends Component {
    state = {}

    render() {
        return (
            <div id="page-content-wrapper">

                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="das m-auto">Dashboard</div>
                </nav>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-6">
                            <div className="content-box">
                                <img alt="screen" src={screenshots} />
                                <p className="title">Screenshots</p>
                                <p className="value">12500</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="col1">
                                <div className="content-box">
                                    <img alt="emp" src={employees} />
                                    <p className="title">All Employees</p>
                                    <p className="value">257</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="col1">
                                <div className="graph-box">
                                    <img alt="chart" src={bar_chart} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
