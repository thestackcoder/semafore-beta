import React, { Component } from 'react';
import axios from 'axios';

class AdminStripeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            cvc: '',
            message: '',
            expYear: '',
            expMonth: '',
            cardNumber: '',
            formProcess: false,
            subscriptionPlan: '',
            cust_id: '',
            subs_id: '',
            status: ''
        }
    }


    // stripe = require('stripe')('sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO');


    year = (new Date()).getFullYear();
    years = Array.from(new Array(15), (val, index) => index + this.year);

    componentDidMount() {
        const id = this.props.id;
        this.setState({ id: id });
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }


    deleteAddSubscription = (e) => {
        e.preventDefault();

        const id = this.state.id;

        this.setState({
            formProcess: true
        });

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
                this.setState({
                    subs_id: data.data.data.subscription_id,
                    cust_id: data.data.data.customer_id
                });
                const subscription = {
                    'customer': this.state.cust_id,
                    'items[0][plan]': this.state.subscriptionPlan,
                };

                fetch('https://api.stripe.com/v1/subscriptions', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: Object.keys(subscription)
                        .map(key => key + '=' + subscription[key])
                        .join('&')
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log('Success:', result);
                        if (result.status === 'active') {
                            this.setState({
                                message: 'User suscribed for  ' + result.items.data[0].plan.nickname,
                            });
                        }
                        axios({
                            method: 'put',
                            url: '/.netlify/functions/updateOrganization',
                            headers: {
                                'Accept': "application/json",
                            },
                            data: {
                                "id": this.state.id,
                                "organization": {
                                    "status": result.status,
                                    "payment_method": result.items.data[0].plan.nickname,
                                    "subscription_id": result.id
                                }
                            }
                        })
                            .then((data) => {
                                console.log(data);
                                this.setState({
                                    formProcess: false
                                });
                            })
                            .catch(error => {
                                console.log(error);
                            });


                    })
                    .catch(error => {
                        console.error('Error:', error);
                        this.setState({
                            message: error.message,
                            formProcess: false
                        });
                    });

            })
            .catch(error => {
                console.log(error);
            });

    }


    render() {

        return (
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                    <div className="das m-auto">Subscription</div>
                </nav>
                <div className="container">
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="firm-box">
                                <div className="container pb-5">
                                    <div className="row">
                                        <div className="col-xs-12 col-md-8 mr-auto ml-auto">
                                            <div className="panel panel-default">
                                                <form className="payment_form" onSubmit={this.deleteAddSubscription}>
                                                    <div className="panel-body mt-3">
                                                        <h5>Update Subscription Plan</h5>
                                                        {
                                                            (this.state.message) ? (
                                                                <p className="alert alert-info">{this.state.message}</p>

                                                            ) : (
                                                                    <span className="p-2"></span>
                                                                )
                                                        }
                                                        <div className="row">
                                                            <div className="col-xs-12 col-md-12">
                                                                <div className="form-group">
                                                                    <label>Subscription Plan</label>
                                                                    <div className="input-group">
                                                                        <select required name="subscriptionPlan" className="form-control" onChange={this.handleChange}>
                                                                            <option value="">Select Plan</option>
                                                                            <option value="plan_HCLnmkUphAjOtD">Annual Billing (per employee)</option>
                                                                            <option value="plan_HCLnsiWIp66uz6">Monthly Billing (per employee)</option>
                                                                            <option value="plan_HCLmkhrjwUcgfV">Annual Billing (fixed)</option>
                                                                            <option value="plan_HBDEzsHuEhN6NI">Monthly Billing (fixed)</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="panel-footer">
                                                        <div className="row">
                                                            <div className="col-xs-12 col-md-12">
                                                                {(this.state.formProcess) ? (
                                                                    <button className="btn btn-default btn-block" disabled>Please wait...</button>
                                                                ) : (
                                                                        <button className="btn btn-default btn-block">Update plan</button>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
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

export default AdminStripeApp;