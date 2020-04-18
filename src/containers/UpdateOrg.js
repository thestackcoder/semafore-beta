import React, { Component } from 'react'
import SideNav from '../components/Sidebar/SideNav';
import axios from 'axios';

class UpdateOrg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name: '',
            transaction_id: '',
            email: '',
            id: '',
            message: false,
            message_text: '',
            empty_field: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { name, id, transaction_id, email } = this.props.location.state;

        this.setState({ name: name, transaction_id: transaction_id, id: id, email: email });
    }

    handleChange(event) {
        this.setState({ name: event.target.value, email: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // if (this.state.name == "" || this.state.transaction_id == "") {
        //     this.setState({ empty_field: true });
        //     return;
        // } else {
        //     this.setState({ empty_field: false });
        // }

        this.setState({ isLoading: true }, () => {
            axios({
                method: 'put',
                url: '/.netlify/functions/updateOrganization',
                headers: {
                    'Accept': "application/json",
                },
                data: {
                    "id": this.state.id,
                    "organization": {
                        "name": this.state.name, "email": this.state.email
                    }
                }
            })
                .then((data) => {
                    // setUserSession(response.data.token, response.data.user);
                    console.log(data);
                    this.setState({ isLoading: false, message: true, message_text: data.data.msg });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ message: false });
                });
        });
    }

    render() {
        let alert;
        if (this.state.message == false) {
            alert = '';
        } else {
            alert = <div className="alert alert-success" role="alert">{this.state.message_text}</div>;
        }

        let alert2;
        if (this.state.empty_field == false) {
            alert2 = '';
        } else {
            alert2 = <div className="alert alert-warning" role="alert">Please fill out the fields first.</div>;
        }

        return (
            <div className="d-flex" id="wrapper">
                <SideNav></SideNav>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button> */}
                        <div className="das m-auto">Edit Organization</div>
                    </nav>
                    <div className="container">
                        <div className="row mt-1">
                            <div className="col-12">
                                <div className="firm-box">
                                    {this.state.empty_field ? alert2 : <span></span>}
                                    {alert}
                                    <div className="col-md-8 col-sm-12 offset-md-2">
                                        <form className="settings_form" onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label>Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fname"
                                                    required
                                                    value={this.state.name}
                                                    onChange={event => this.setState({ name: event.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    required
                                                    value={this.state.email}
                                                    onChange={event => this.setState({ email: event.target.value })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Transaction ID:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lname"
                                                    required
                                                    value={this.state.transaction_id}
                                                    onChange={event => this.setState({ transaction_id: event.target.value })}
                                                    disabled
                                                />
                                            </div>
                                            <button className="mt-4 mb-2 btn btn-block btn-default" onClick={this.handleSubmit}>
                                                {this.state.isLoading ? <div className="btn-loader"></div> : "Update"}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UpdateOrg;