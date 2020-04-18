import React, { Component } from 'react';
import "../stylesheets/Sidebar.css";
import chat from "../images/chat.png";
import group from "../images/green-group.png";
import bar_chart from "../images/bar_chart.png";
import SideNav from './Sidebar/SideNav';

class Main extends Component {
    state = {}

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideNav></SideNav>
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
                                    <img src={chat} alt="Chat" />
                                    <p className="title">Messages</p>
                                    <p className="value">12500</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="col1">
                                    <div className="content-box">
                                        <img src={group} alt="Group" />
                                        <p className="title">Organisations</p>
                                        <p className="value">257</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12">
                                <div className="col1">
                                    <div className="graph-box">
                                        <img src={bar_chart} alt="sample-chart" />
                                    </div>
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
