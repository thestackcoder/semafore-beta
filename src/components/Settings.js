import React, { Component } from 'react'
import avatar from "../images/avatar.png";
import SideNav from './Sidebar/SideNav';


class Settings extends Component {

    state = {
        first_name: "John",
        last_name: "Doe",
        current_password: "12345678",
        new_password: "87654321",
        confirm_password: "87654321",
    }

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideNav></SideNav>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        <div className="das m-auto">Settings</div>
                    </nav>
                    <div className="container">
                        <div className="row mt-1">
                            <div className="col-10 offset-1">
                                <div className="firm-box">
                                    <div className="col-8 offset-md-2">
                                        <form className="settings_form">
                                            <div className="form-group text-center">
                                                <img src={avatar} alt="user-profile-pic" />
                                            </div>
                                            <div className="form-group">
                                                <label>First Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fname"
                                                    value={this.state.first_name}
                                                    onChange={event => this.setState({ first_name: event.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lname"
                                                    value={this.state.last_name}
                                                    onChange={event => this.setState({ last_name: event.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Current Password:</label>
                                                <input type="text" className="form-control" id="pwd_1" value={this.state.current_password} />
                                            </div>
                                            <div className="form-group">
                                                <label for="pwd">New Password:</label>
                                                <input type="password" className="form-control" id="pwd_2" />
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm New Password:</label>
                                                <input type="password" className="form-control" id="pwd_3" />
                                            </div>
                                            <div className="form-group text-center">
                                                <button type="submit" className="btn btn-default">Save</button>
                                            </div>
                                        </form>
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

export default Settings;
