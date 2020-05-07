import React, { Component } from 'react'
import avatar from "../images/avatar.png";
import axios from 'axios';

class OSettings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            id: "",
            email: "",
            name: "",
            new_password: "",
            old_password: "",
            confirm_password: "",
            message: false,
            message_text: '',
            empty_field: false,
            please_wait: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // const email = this.props.email;
        // const name = this.props.name;
        const id = this.props.id;

        this.setState({ id: id, please_wait: true });

        axios('/.netlify/functions/getOrganization', {
            method: 'post',
            header: {
                'Accept': "application/json",
            },
            data: {
                "_id": id
            }
        })
            .then((data) => {
                console.log(data);
                this.setState({ id: id, email: data.data.data.email, name: data.data.data.name, please_wait: false });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
        this.setState({ name: event.target.value, email: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.email === "" || this.state.old_password === "" || this.state.new_password === "") {
            this.setState({ empty_field: true });
            return;
        } else {
            this.setState({ empty_field: false });
        }
        this.setState({ isLoading: true }, () => {
            axios({
                method: 'put',
                url: '/.netlify/functions/updateOrgProfile',
                headers: {
                    'Accept': "application/json",
                },
                data: {
                    "id": this.state.id,
                    "email": this.state.email,
                    "name": this.state.name,
                    "password": this.state.new_password,
                    "old_password": this.state.old_password,
                }
            })
                .then((data) => {
                    // setUserSession(response.data.token, response.data.user);
                    console.log(data);
                    this.setState({ isLoading: false, message: true, message_text: data.data.msg });
                })
                .catch(error => {
                    this.setState({ message: true, message_text: error.response.data.msg, isLoading: false });
                });
        });

    }


    render() {
        let alert;
        if (this.state.message === false) {
            alert = '';
        } else {
            alert = <div className="alert alert-info" role="alert">{this.state.message_text}</div>;
        }

        let alert2;
        if (this.state.empty_field === false) {
            alert2 = '';
        } else {
            alert2 = <div className="alert alert-warning" role="alert">Please fill out the fields first.</div>;
        }

        return (
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
                                {this.state.empty_field ? alert2 : <span></span>}
                                {alert}
                                <div className="col-8 offset-md-2">
                                    <form className="settings_form">
                                        <div className="form-group text-center">
                                            <img src={avatar} alt="user-profile-pic" />
                                        </div>
                                        {(this.state.please_wait) ? (<span className="info">Please wait...</span>) : (<span></span>)}
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={this.state.name}
                                                onChange={event => this.setState({ name: event.target.value })}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="fname"
                                                value={this.state.email}
                                                onChange={event => this.setState({ email: event.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Current Password:</label>
                                            <input type="text" className="form-control" id="pwd_1" onChange={event => this.setState({ old_password: event.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password:</label>
                                            <input type="text" className="form-control" id="pwd_2" onChange={event => this.setState({ new_password: event.target.value })} />
                                        </div>
                                        {/* <div className="form-group">
                                                <label>Confirm New Password:</label>
                                                <input type="password" className="form-control" id="pwd_3" />
                                            </div> */}
                                        <div className="form-group text-center">

                                            {(this.state.isLoading) ? (
                                                <button className="btn btn-default" disabled>Please wait...</button>
                                            ) : (
                                                    <button onClick={this.handleSubmit} type="submit" className="btn btn-default">Update</button>
                                                )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OSettings;
