import React, { Component } from 'react'
// import Table from "./Table";
import '../stylesheets/togglecheck.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'wouter';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class Organization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            delLoad: false,
            msg: null,
            isActive: "false",
            orgs: [],
            toggledClearRows: false,
            rowsData: [],
            subs_id: ''
        }
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
            name: 'Joining Date',
            selector: 'date',
            sortable: true,
        },
        {
            name: 'Active',
            cell: row => {
                return (<div>
                    <label className='switch'>
                        {(row.active === 'false') ? (
                            <input type='checkbox' />
                        ) : (
                                <input type='checkbox' defaultChecked />
                            )}
                        <span onClick={() => { if (window.confirm('Are you sure you want to change active status?')) this.checkClick(row._id, row.active) }} className='slider'></span>
                    </label>
                </div>)

            }
        },
        {
            name: "Action",
            cell: row => <div>
                <Link to={"/update-organization/" + row._id + ',' + row.name + ',' + row.email} className="btn btn-success btn-sm">Edit</Link>
                    &nbsp; &nbsp;
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this organization?')) this.deleteRow(row._id) }} className="btn btn-danger btn-danger-main btn-sm">Delete</button>
            </div>,
        }

    ]


    componentDidMount() {

        axios.get('/.netlify/functions/readOrganization')
            .then((data) => {
                // setUserSession(response.data.token, response.data.user);
                var res = data.data.data;
                // let arr = res.map(obj => Object.values(obj));
                this.setState({ loading: false, msg: data.data.msg, orgs: res });
                console.log(this.state.orgs);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange = (state) => {
        console.log('Selected Rows: ', state.selectedRows);
    };

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows });
    }

    checkClick = (id, active) => {
        let a;
        if (active === 'false') {
            a = 'true';
        } else {
            a = 'false'
        }

        console.log(id)
        console.log(active)
        console.log(a);

        axios('/.netlify/functions/active', {
            method: 'post',
            header: {
                'Accept': "application/json",
            },
            data: {
                "id": id,
                "organization": {
                    "active": a
                }
            }
        })
            .then((data) => {
                this.setState({ isActive: data.data.active });
                axios('http://95.216.2.224:3000/updateOrgEmployeesStatus', {
                    method: 'post',
                    header: {
                        'Accept': "application/json",
                    },
                    data: {
                        "organisation_id": id,
                        "status": a
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

    deleteRow = (id) => {
        this.setState({ delLoad: true });
        console.log(id);
        let current_orgs = [...this.state.orgs];

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
                this.setState({ subs_id: data.data.data.subscription_id });
                var subsId = data.data.data.subscription_id;
                if (subsId) {
                    axios.delete('https://api.stripe.com/v1/subscriptions/' + subsId, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer sk_test_vk9uEEhDsKaSPsnGqQNPPNaM00qdR5u7CO',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .then((data) => {
                            console.log(data);
                            axios.delete('/.netlify/functions/deleteOrganization', {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                data: {
                                    "_id": id
                                }
                            })
                                .then((data) => {
                                    // console.log(data);
                                    let updated_orgs = current_orgs.filter(org => org._id !== id)
                                    this.setState({ orgs: updated_orgs, delLoad: false });
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    axios.delete('/.netlify/functions/deleteOrganization', {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: {
                            "_id": id
                        }
                    })
                        .then((data) => {
                            // console.log(data);
                            let updated_orgs = current_orgs.filter(org => org._id !== id)
                            this.setState({ orgs: updated_orgs, delLoad: false });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

            })
            .catch(error => {
                console.log(error);
            });


    }

    render() {
        return (

            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="das m-auto">Organizations</div>
                </nav>
                <div className="container">
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="firm-box">
                                <h5 className="heading">All Organizations</h5>
                                <a href="/add-organization" className="btn btn-primary primary-btn">Add Organization</a>
                                <div>
                                    {(this.state.delLoad) ? (<span className="info">Please wait...</span>) : (<span></span>)}
                                    {
                                        this.state.loading || !this.state.msg ? (
                                            <div className="parent-loader"><div className="loader"></div></div>
                                        ) : (
                                                <div>
                                                    {/* <Table data={this.state.orgs}></Table> */}
                                                    <DataTable
                                                        columns={this.columns}
                                                        data={this.state.orgs}
                                                        selectableRows // add for checkbox selection
                                                        onSelectedRowsChange={this.handleChange}
                                                        clearSelectedRows={this.state.toggledClearRows}
                                                        pagination
                                                        fixedHeader
                                                        selectableRowsHighlight
                                                        selectableRowsNoSelectAll
                                                    // onSelectedRowsChange={this.deleteRow}
                                                    // expandableRows
                                                    />
                                                </div>
                                            )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Organization;
