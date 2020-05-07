import React from 'react';
import Navlist from './Navlist';
import Profile from '../Sidebar/Profile';
import "../../stylesheets/Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "wouter";


function SideNav() {
    return (
        <div className="bg-dark" id="sidebar-wrapper">
            <div className="sidebar-heading">
                <Link to="/organizational-dashboard">
                    <div className="m-auto"><img className="logo" src={logo} alt="semafore-logo" /> <span>SemaFore</span></div>
                </Link>
            </div>
            <Profile></Profile>
            <Navlist></Navlist>
        </div>
    )
}

export default SideNav;
