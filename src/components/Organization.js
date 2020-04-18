import React, { Component } from 'react'
// import Table from "./Table";
import SideNav from './Sidebar/SideNav';
import '../stylesheets/togglecheck.css';
import axios from 'axios';
import DataTable, { createTheme } from 'react-data-table-component';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Organization extends Component {

    state = {
        loading: true,
        msg: null,
        isActive: false,
        orgs: [],
        toggledClearRows: false,
        rowsData: []
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
            cell: row => <div>
                <label className='switch'>
                    <input onChange={this.handleCheckClick} type='checkbox' />
                    <span className='slider'></span>
                </label>
            </div>
        },
        {
            name: "Action",
            cell: row => <div>
                <Link to={{
                    pathname: "/update-organization",
                    state: {
                        id: row._id,
                        name: row.name,
                        transaction_id: row.transaction_id,
                        email: row.email
                    }
                }} className="btn btn-success btn-sm">Edit</Link>
                    &nbsp; &nbsp;
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this organization?')) this.deleteRow(row._id) }} className="btn btn-danger btn-sm">Delete</button>

            </div>,
        }

    ]


    componentDidMount() {
        // const url = "http://localhost:8888/.netlify/functions/readOrganization";
        // const response = await fetch(url);
        // const data = await response.json();
        // console.log(data);
        // this.setState({ orgs: data })

        axios.get('/.netlify/functions/readOrganization')
            .then((data) => {
                // setUserSession(response.data.token, response.data.user);
                var res = data.data.data;
                // let arr = res.map(obj => Object.values(obj));
                this.setState({ loading: false, msg: data.data.msg, orgs: res });
                // console.log(this.state.orgs);
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {

    }

    handleChange = (state) => {
        console.log('Selected Rows: ', state.selectedRows);
    };

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows });
    }

    handleCheckClick = () => {
        let active = !this.state.isActive;
        console.log(active);
        this.setState({ isActive: active });
        // axios({
        //     method: 'put',
        //     url: '/.netlify/functions/updateOrganization',
        //     headers: {
        //         'Accept': "application/json",
        //     },
        //     data: {
        //         "id": id,
        //         "organization": {
        //             "active": this.state.isActive
        //         }
        //     }
        // })
        //     .then((data) => {
        //         // setUserSession(response.data.token, response.data.user);
        //         console.log(data);
        //         this.setState({ active: !this.state.isActive })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    deleteRow = (id) => {
        console.log(id);
        let current_orgs = [...this.state.orgs];
        axios.delete('/.netlify/functions/deleteOrganization', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "_id": id
            }
        })
            .then((data) => {
                // setUserSession(response.data.token, response.data.user);
                // console.log(data);
                let updated_orgs = current_orgs.filter(org => org._id !== id)
                this.setState({ orgs: updated_orgs });
            })
            .catch(error => {
                console.log(error);
            });
    }

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
                                    <div className="das m-auto">Organizations</div>
                                </nav>
                                <div className="container">
                                    <div className="row mt-1">
                                        <div className="col-12">
                                            <div className="firm-box">
                                                <h5 className="heading">All Organizations</h5>
                                                <Link to="/add-organization" className="btn btn-primary primary-btn">Add Organization</Link>

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

export default Organization;
