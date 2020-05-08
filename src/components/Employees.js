import React, { Component } from 'react'
import { Link } from 'wouter';
import DataTable from 'react-data-table-component';
import axios from 'axios';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            delLoad: false,
            isActive: false,
            msg: null,
            isActive: "false",
            emps: [],
            toggledClearRows: false,
            rowsData: [],
        }
    }

    columns = [
        {
            name: 'Employee Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: 'phoneNo',
            sortable: true,
        },
        {
            name: 'Phone Type',
            selector: 'type',
            sortable: true,
        },
        {
            name: 'Joined Date',
            selector: 'joined_date',
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
            cell: row => <div>
                <Link to={"/update-employee/" + row.phoneNo + ',' + row.name} className="btn btn-success btn-sm">Edit</Link>
                    &nbsp; &nbsp;
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this employee?')) this.deleteRow(row.phoneNo) }} className="btn btn-danger btn-danger-main btn-sm">Delete</button>
            </div>,
        }

    ]

    componentDidMount() {
        axios({
            method: 'post',
            url: 'http://95.216.2.224:3000/getOrgEmployees',
            headers: {
                'Accept': "application/json",
            },
            data: {
                "organisation_id": "5eb40aa21861ed7c046fffc5"
            }
        })
            .then((data) => {
                console.log(data.data);
                this.setState({ loading: false, msg: data.data.message, emps: data.data.employees });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows });
    }

    handleCheckClick = () => {
        let active = !this.state.isActive;
        console.log(active);
        this.setState({ isActive: active });
    }

    deleteRow = (phone) => {
        this.setState({ delLoad: true });
        console.log(phone);
        let current_emps = [...this.state.emps];

        axios('http://95.216.2.224:3000/deleteEmployee', {
            method: 'post',
            header: {
                'Accept': "application/json",
            },
            data: {
                "phoneNo": phone
            }
        })
            .then((data) => {
                let updated_emps = current_emps.filter(emp => emp.phoneNo !== phone)
                this.setState({ emps: updated_emps, delLoad: false });
            })
            .catch(error => {
                console.log(error);
            });

    }


    render() {
        const id = "5eb40aa21861ed7c046fffc5";
        return (
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                    <div className="das m-auto">Employees</div>
                </nav>
                <div className="container">
                    <div className="row mt-2">
                        <div className="col-12">
                            <div className="mb-3">
                                <Link to={'/add-employee/' + id} className="btn btn-primary primary-btn-x">Add New</Link   >
                                <a className="btn btn-primary primary-btn float-right">Import CSV</a>
                            </div>
                            <div className="firm-box">
                                <h5>All Employees</h5>
                                {(this.state.delLoad) ? (<span className="info">Please wait...</span>) : (<span></span>)}
                                {
                                    this.state.loading || !this.state.msg ? (
                                        <div className="parent-loader"><div className="loader"></div></div>
                                    ) : (
                                            <DataTable
                                                columns={this.columns}
                                                selectableRows // add for checkbox selection
                                                data={this.state.emps}
                                                onSelectedRowsChange={this.handleChange}
                                                clearSelectedRows={this.state.toggledClearRows}
                                                pagination
                                                fixedHeader
                                                selectableRowsHighlight
                                                selectableRowsNoSelectAll
                                            // onSelectedRowsChange={this.deleteRow}
                                            // expandableRows
                                            />
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Employees;
