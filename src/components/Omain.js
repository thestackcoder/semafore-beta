import React, { useState, useEffect } from 'react';
import "../stylesheets/Sidebar.css";
import screenshots from "../images/screensht-green.png";
import employees from "../images/employee-green.png";
import bar_chart from "../images/bar_chart.png";
import axios from 'axios';
import chat from "../images/chat.png";
import { useAuth } from "../providers/auth-provider";

const Main = () => {
    const { logout, user } = useAuth();
    const [emp, setEmps] = useState();
    const [emplength, setEmpsLength] = useState();
    const [msgCount, setMsgCount] = useState();

    useEffect(() => {
        axios({
            method: 'post',
            url: '/.netlify/functions/getEmployees',
            hedaer: {
                'Accept': "application/json",
            },
            data: {
                'organisation_id': user.id
            }
        })
            .then((response) => {
                console.log(response);
                setEmps(response.data.employees);
                setEmpsLength(response.data.employees.length);
            })
            .catch(error => {
                console.log(error);
            });

        axios({
            method: 'post',
            url: '/.netlify/functions/getOrgsMsgsCount',
            hedaer: {
                'Accept': "application/json",
            },
            data: {
                'organisation_id': user.id
            }
        })
            .then((response) => {
                // console.log(response);
                setMsgCount(response.data.count);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

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
                            <img alt="screen" src={chat} />
                            <p className="title">Messages</p>
                            <p className="value">{msgCount}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="col1">
                            <div className="content-box">
                                <img alt="emp" src={employees} />
                                <p className="title">All Employees</p>
                                <p className="value">{emplength}</p>
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

export default Main;
