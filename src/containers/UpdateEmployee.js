import React, { Component } from 'react'
import axios from 'axios';

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name: '',
            transaction_id: '',
            email: '',
            phone: '',
            message: false,
            message_text: '',
            empty_field: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const name = this.props.name;
        const urlEncodedName = decodeURI(name);
        const phone = this.props.phone;

        this.setState({ phone: phone, name: urlEncodedName });
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.name === "") {
            this.setState({ empty_field: true });
            return;
        } else {
            this.setState({ empty_field: false });
        }

        this.setState({ isLoading: true }, () => {
            axios({
                method: 'post',
                url: '/.netlify/functions/updateEmployeeName',
                headers: {
                    'Accept': "application/json",
                },
                data: {
                    "name": this.state.name,
                    "phoneNo": this.state.phone
                }
            })
                .then((data) => {
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
        if (this.state.message === false) {
            alert = '';
        } else {
            alert = <div className="alert alert-info" role="alert">{this.state.message_text}</div>;
        }

        let alert2;
        if (this.state.empty_field === false) {
            alert2 = '';
        } else {
            alert2 = <div className="alert alert-warning" role="alert">Name must not be empty.</div>;
        }

        return (
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="das m-auto">Edit Employee</div>
                </nav>
                <div className="container">
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="firm-box">
                                <div className="col-md-8 col-sm-12 offset-md-2">
                                    {this.state.empty_field ? alert2 : <span></span>}
                                    {alert}
                                    <form className="settings_form" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fname"
                                                value={this.state.name}
                                                onChange={event => this.setState({ name: event.target.value })}
                                            />
                                        </div>

                                        <button className="mt-4 mb-2 btn btn-block btn-default" type="submit">
                                            {this.state.isLoading ? <div className="btn-loader"></div> : "Update"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UpdateEmployee;