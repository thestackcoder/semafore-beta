import React, { Component } from 'react'
import SideNav from './Sidebar/SideNav';
import "../stylesheets/togglecheck.css";
import axios from 'axios';
import { Link } from 'wouter';
import DataTable from 'react-data-table-component';

class Billing extends Component {

    state = {
        loading: true,
        msg: null,
        isActive: false,
        orgs: [],
        toggledClearRows: false,
        rowsData: [],
        status: ''
    }

    columns = [
        {
            name: 'ID',
            selector: '_id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Payment Method',
            selector: 'payment_method',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'Active',
            cell: row => <div>
                <label className='switch'>
                    <input type='checkbox' />
                    <span className='slider'></span>
                </label>
            </div>
        },
        {
            name: "Action",
            cell: row => {
                if (this.state.status == 'canceled') {
                    return <div>
                        <Link to={"/payment/" + row._id} className="btn btn-success btn-sm" > Update Plan</Link>
                    </div >
                } else {
                    return (
                        <button onClick={this.cancelSubscription} className="btn btn-danger btn-danger-main btn-sm">Cancel Subscription</button>
                    );
                }
            }

        }

    ]

    componentDidMount() {

        axios.get('/.netlify/functions/readOrganization')
            .then((data) => {
                // setUserSession(response.data.token, response.data.user);
                var res = data.data.data;
                // let arr = res.map(obj => Object.values(obj));
                this.setState({ loading: false, status: data.data.data[0].status, msg: data.data.msg, orgs: res });
                console.log(this.state.status);
            })
            .catch(error => {
                console.log(error);
            });
    }


    // cancelSubscription = () => {
    //     axios.delete('https://api.stripe.com/v1/subscriptions/' + this.state.subs_id, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO',
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     })
    //         .then((data) => {
    //             console.log(data);
    //             this.setState({ loading: false, org_status: data.data.status });
    //             axios({
    //                 method: 'put',
    //                 url: '/.netlify/functions/updateOrganization',
    //                 headers: {
    //                     'Accept': "application/json",
    //                 },
    //                 data: {
    //                     "id": this.state.id,
    //                     "organization": {
    //                         "status": this.state.org_status,
    //                     }
    //                 }
    //             })
    //                 .then((data) => {
    //                     console.log(data);
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                 });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });

    // }


    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideNav></SideNav>
                {
                    this.state.loading || !this.state.msg ? (
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
                                                <h5>Billing Details</h5>
                                                {/* <Table data={this.dataSet}></Table> */}
                                                <DataTable
                                                    columns={this.columns}
                                                    data={this.state.orgs}
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

export default Billing;
