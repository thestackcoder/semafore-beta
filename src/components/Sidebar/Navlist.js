import React from 'react'
import gear from "../../images/gear.png";
import group from "../../images/group.png";
import organization from "../../images/organization-color.png";
import billing from "../../images/billing.png";
import logout from "../../images/logout.png";
import billing_color from "../../images/billing-color.png";
import gear_color from "../../images/gear-color.png";
import logout_color from "../../images/logout-color.png";
import {
    // BrowserRouter as Router,
    Link
} from "react-router-dom";

function Navlist() {
    return (
        <div className="list-group list-group-flush">
            <div className="search">
                <input type="text" name="" placeholder="Search...." className="list-group-item list-group-item-action" />
            </div>
            {/* <a href="#" className="list-group-item list-group-item-action bg-dark">Dashboard</a> */}
            <Link to="/organization" className="list-group-item list-group-item-action bg-dark"><img id="white-1" src={group} alt="avatar" /> <img id="colored-icon-1" src={organization} alt="organization" /> Organizations</Link>
            <Link to="/billing" className="list-group-item list-group-item-action bg-dark"><img id="white-2" src={billing} alt="avatar" /> <img id="colored-icon-2" src={billing_color} alt="billing" /> Billing</Link>
            <Link to="/settings" className="list-group-item list-group-item-action bg-dark"><img id="white-3" src={gear} alt="avatar" /> <img id="colored-icon-3" src={gear_color} alt="settings" /> Settings</Link>
            <Link to="/login" className="list-group-item list-group-item-action bg-dark"><img id="white-4" src={logout} alt="avatar" /> <img id="colored-icon-4" src={logout_color} alt="logout" /> Logout</Link>
        </div>
    )
}

export default Navlist;
