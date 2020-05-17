import React, { Component } from 'react'
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            isLoading: false,
            phone: '',
            name: '',
            password: '',
            transaction_id: '',
            message: false,
            response_text: '',
            empty_field: false,
            active: '',
            empsLength: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.id;
        console.log(id);
        this.setState({ id: id });
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
                this.setState({ active: data.data.data.active });
            }).catch(err => {
                console.log(err);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.name === "" || this.state.phone === "") {
            this.setState({ empty_field: true });
            return;
        } else {
            this.setState({ empty_field: false });
        }

        this.setState({ isLoading: true }, () => {
            axios({
                method: 'post',
                url: '/.netlify/functions/addEmployee',
                headers: {
                    'Accept': "application/json",
                },
                data: {
                    "name": this.state.name,
                    "phoneNo": '+' + this.state.phone,
                    "organisation_id": this.state.id,
                }
            })
                .then((data) => {
                    console.log(data);
                    this.setState({ name: '', phone: '' });
                    this.setState({ isLoading: false, message: true, response_text: data.data.msg });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ message: false, isLoading: false });
                });
        });

    }

    render() {
        let alert;
        if (this.state.message === false) {
            alert = '';
        } else {
            alert = <div className="alert alert-info" role="alert">{this.state.response_text}</div>;
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
                    <div className="das m-auto">Add New Employee</div>
                </nav>
                <div className="container">
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="firm-box">
                                {this.state.empty_field ? alert2 : <span></span>}
                                {alert}
                                <div className="col-md-8 col-sm-12 offset-md-2">
                                    {(this.state.active === 'false') ? (
                                        <div>
                                            <span className="info">Subscribe to activate this feature. <br></br>Go to our website to see details www.semafore.com</span>
                                            <br></br><a href="../">Go back</a>
                                        </div>
                                    ) : (
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
                                                    <label>Phone:</label>
                                                    <PhoneInput
                                                        enableAreaCodes={true}
                                                        country={'us'}
                                                        value={this.state.phone}
                                                        onChange={phone => this.setState({ phone })}
                                                    />

                                                </div>
                                                <button className="mt-4 mb-2 btn btn-block btn-default" onClick={this.handleSubmit}>
                                                    {this.state.isLoading ? <div className="btn-loader"></div> : "Add"}
                                                </button>
                                            </form>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}


export default AddEmployee;