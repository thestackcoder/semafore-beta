import React, { Component } from 'react';
import axios from 'axios';
import SideNav from './ClientSidebar/SideNav';


class StripeApp extends Component {
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
            subscriptionPlan: ''
        }
    }


    // stripe = require('stripe')('sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO');


    year = (new Date()).getFullYear();
    years = Array.from(new Array(15), (val, index) => index + this.year);

    componentDidMount() {
        const id = this.props.id;
        this.setState({ id: id });
        this.loadStripe();
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }


    createCustomerAndSubscription = (id) => {
        // e.preventDefault();
        console.log(id);
        // this.setState({
        //     formProcess: true
        // });

        // let formData = new FormData();
        // formData.append('source', id);

        const customer = {
            'description': 'New Customer',
            'source': id,
        };



        fetch('https://api.stripe.com/v1/customers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: Object.keys(customer)
                .map(key => key + '=' + customer[key])
                .join('&')
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                console.log(this.state.id);

                const subscription = {
                    'customer': result.id,
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
                                    "customer_id": result.customer,
                                    "subscription_id": result.id
                                }
                            }
                        })
                            .then((data) => {
                                // setUserSession(response.data.token, response.data.user);
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
                console.error('Error:', error);
                this.setState({
                    message: error.message,
                    formProcess: false
                });
            });
    }


    pay = (e) => {

        e.preventDefault();

        this.setState({
            formProcess: true
        });

        window.Stripe.card.createToken({
            number: this.state.cardNumber,
            exp_month: this.state.expMonth,
            exp_year: this.state.expYear,
            cvc: this.state.cvc
        }, (status, response) => {
            if (status === 200) {
                this.createCustomerAndSubscription(response.id);
                // this.setState({
                //     formProcess: false
                // });
            } else {
                this.setState({
                    message: response.error.message,
                    formProcess: false
                });
            }
        });
    }

    loadStripe = () => {

        if (!window.document.getElementById('stripe-script')) {
            var s = window.document.createElement("script");
            s.id = "stripe-script";
            s.type = "text/javascript";
            s.src = "https://js.stripe.com/v2/";
            s.onload = () => {
                window['Stripe'].setPublishableKey('pk_test_x9nzl7jOF27PYkuzfuNj66Ii004bIMGJgJ');
            }
            window.document.body.appendChild(s);
        }
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
                                                    <form className="payment_form" onSubmit={this.pay}>
                                                        <div className="panel-body mt-3">
                                                            <h5>Payment Details</h5>
                                                            {
                                                                (this.state.message) ? (
                                                                    <p className="alert alert-info">{this.state.message}</p>

                                                                ) : (
                                                                        <span className="p-2"></span>
                                                                    )
                                                            }
                                                            <div className="row">
                                                                <div className="col-xs-6 col-md-6">
                                                                    <div className="form-group">
                                                                        <label>Card Number</label>
                                                                        <div className="input-group">
                                                                            <input required type="text" className="form-control" placeholder="Valid Card Number" name="cardNumber" maxLength="18" onChange={this.handleChange} />
                                                                            <span className="input-group-addon"><span className="fa fa-credit-card"></span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xs-6 col-md-6">
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
                                                            <div className="row">
                                                                <div className="col-xs-7 col-md-7">
                                                                    <div className="form-group">
                                                                        <label><span className="hidden-xs">Expiration</span> Date</label>
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <select required name="expMonth" className="form-control" onChange={this.handleChange}>
                                                                                        <option value="">Select Month</option>
                                                                                        <option value="1">01</option>
                                                                                        <option value="2">02</option>
                                                                                        <option value="3">03</option>
                                                                                        <option value="4">04</option>
                                                                                        <option value="5">05</option>
                                                                                        <option value="6">06</option>
                                                                                        <option value="7">07</option>
                                                                                        <option value="8">08</option>
                                                                                        <option value="9">09</option>
                                                                                        <option value="10">10</option>
                                                                                        <option value="11">11</option>
                                                                                        <option value="12">12</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 pull-right">
                                                                                <div className="form-group">
                                                                                    <select required name="expYear" className="form-control" onChange={this.handleChange}>
                                                                                        <option value="">Select Year</option>
                                                                                        {
                                                                                            this.years.map((year, index) => {
                                                                                                return <option key={`year${index}`} value={year}>{year}</option>
                                                                                            })
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xs-5 col-md-5 pull-right">
                                                                    <div className="form-group">
                                                                        <label>CVV Code</label>
                                                                        <input type="text" name="cvv" className="form-control" placeholder="CVC" maxLength="4" onChange={this.handleChange} />
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
                                                                            <button className="btn btn-default btn-block">Process payment</button>
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
            </div>


        );
    }
}

export default StripeApp;