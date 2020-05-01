import React from 'react'
import gear from "../../images/gear.png";
import group from "../../images/employees.png";
import organization from "../../images/employee-green.png";
import billing from "../../images/billing.png";
import logout_white from "../../images/logout.png";
import billing_color from "../../images/billing-color.png";
import gear_color from "../../images/gear-color.png";
import screenshots from "../../images/screenshot.png";
import screenshots_color from "../../images/screensht-green.png";
import logout_color from "../../images/logout-color.png";
import { Link } from "wouter";
import { useAuth } from "../../providers/auth-provider";

function Navlist() {
    const { logout, user } = useAuth();

    return (
        <div className="list-group list-group-flush">
            <div className="search">
                <input type="text" name="" placeholder="Search...." className="list-group-item list-group-item-action" />
            </div>
            {/* <a href="#" className="list-group-item list-group-item-action bg-dark">Dashboard</a> */}
            <Link to="/employees" className="list-group-item list-group-item-action bg-dark"><img id="white-1" src={group} alt="avatar" /> <img id="colored-icon-1" src={organization} alt="organization" /> All Employees</Link>
            <Link to={"/organizational-billing/" + user.id} className="list-group-item list-group-item-action bg-dark"><img id="white-2" src={billing} alt="avatar" /> <img id="colored-icon-2" src={billing_color} alt="billing" /> Billing</Link>
            <Link to="/organizational-settings" className="list-group-item list-group-item-action bg-dark"><img id="white-3" src={gear} alt="avatar" /> <img id="colored-icon-3" src={gear_color} alt="settings" /> Settings</Link>
            <Link to="/screenshots" className="list-group-item list-group-item-action bg-dark"><img id="white-3" src={screenshots} alt="avatar" /> <img id="colored-icon-3" src={screenshots_color} alt="settings" /> Screenshots</Link>
            <a onClick={logout} className="list-group-item list-group-item-action bg-dark"><img id="white-4" src={logout_white} alt="avatar" /> <img id="colored-icon-4" src={logout_color} alt="logout" /> Logout</a>
        </div>
    )
}

export default Navlist;
