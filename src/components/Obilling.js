import React, { Component } from 'react'
import SideNav from './ClientSidebar/SideNav';
import "../stylesheets/togglecheck.css";
import axios from 'axios';
import { Link } from 'wouter';
import DataTable from 'react-data-table-component';

class OBilling extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            loading: true,
            msg: null,
            isActive: false,
            orgs: [],
            toggledClearRows: false,
            rowsData: [],
            status: '',
            payments: [],
            subs_id: '',
            org_status: ''
        }
    }

    columns = [
        {
            name: 'Amount',
            selector: 'amount',
            sortable: true,
        },
        {
            name: 'Currency Type',
            selector: 'currency',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        }

    ]

    componentDidMount() {
        const id = this.props.id;
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
                console.log(data);
                this.setState({ org_status: data.data.data.status, subs_id: data.data.data.subscription_id });
                axios.get('https://api.stripe.com/v1/payment_intents', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        customer: data.data.data.customer_id
                    }
                })
                    .then((data) => {
                        this.setState({ loading: false, payments: data.data.data });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }


    cancelSubscription = () => {
        axios.delete('https://api.stripe.com/v1/subscriptions/' + this.state.subs_id, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((data) => {
                console.log(data);
                this.setState({ loading: false, org_status: data.data.status });
                axios({
                    method: 'put',
                    url: '/.netlify/functions/updateOrganization',
                    headers: {
                        'Accept': "application/json",
                    },
                    data: {
                        "id": this.state.id,
                        "organization": {
                            "status": this.state.org_status,
                        }
                    }
                })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        let action;
        if (this.state.org_status == 'canceled') {
            action = <Link to={"/payment/" + this.state.id} className="btn btn-primary primary-btn">Update Subscription</Link>
        } else {
            action = <button onClick={this.cancelSubscription} className="btn btn-danger danger-btn">Cancel Subscription</button>
        }
        return (
            <div className="d-flex" id="wrapper">
                <SideNav></SideNav>
                {
                    this.state.loading ? (
                        <div className="parent-loader"><div className="loader"></div></div>
                    ) : (
                            <div id="page-content-wrapper">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                                    <div className="das m-auto">Billing</div>
                                </nav>
                                <div className="container">
                                    <div className="row mt-1">
                                        <div className="col-12">
                                            <div className="firm-box">
                                                <h5 className="heading">Billing Details</h5>
                                                {action}
                                                {/* <Table data={this.dataSet}></Table> */}

                                                <DataTable
                                                    columns={this.columns}
                                                    data={this.state.payments}
                                                    pagination
                                                    fixedHeader
                                                    selectableRowsHighlight
                                                    selectableRowsNoSelectAll
                                                // onSelectedRowsChange={this.deleteRow}
                                                // expandableRows
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default OBilling;
