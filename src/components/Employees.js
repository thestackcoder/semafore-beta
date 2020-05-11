import React, { Component } from 'react'
import { Link } from 'wouter';
import DataTable from 'react-data-table-component';
import axios from 'axios';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            loading: true,
            delLoad: false,
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
        // {
        //     name: 'Status',
        //     selector: 'status',
        //     sortable: true,
        // },
        {
            name: 'Active',
            cell: row => {
                return (<div>
                    <label className='switch'>
                        {(row.status === 'false') ? (
                            <input type='checkbox' />
                        ) : (
                                <input type='checkbox' defaultChecked />
                            )}
                        <span onClick={() => { if (window.confirm('Are you sure you want to change status of employee?')) this.checkClick(row.phoneNo, row.status) }} className='slider'></span>
                    </label>
                </div>)

            }
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
        const id = this.props.id;
        this.setState({ id: id });
        axios({
            method: 'post',
            url: '/.netlify/functions/getOrganization',
            headers: {
                'Accept': "application/json",
            },
            data: {
                '_id': id
            }
        })
            .then((data) => {
                console.log(data.data.data.active);
                this.setState({ isActive: data.data.data.active });
            })
            .catch(error => {
                console.log(error);
            });

        axios({
            method: 'post',
            url: '/.netlify/functions/getEmployees',
            headers: {
                'Accept': "application/json",
            },
            data: {
                'organisation_id': id
            }
        })
            .then((data) => {
                console.log(data.data);
                this.setState({ loading: false, msg: data.data.msg, emps: data.data.employees });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows });
    }

    // handleCheckClick = () => {
    //     let active = !this.state.isActive;
    //     console.log(active);
    //     this.setState({ isActive: active });
    // }

    checkClick = (phone, active) => {
        let a;
        if (active === 'false') {
            a = 'true';
        } else {
            a = 'false'
        }

        console.log(phone);
        console.log(active);
        console.log(a);

        axios('/.netlify/functions/updateEmployeeStatus', {
            method: 'post',
            header: {
                'Accept': "application/json",
            },
            data: {
                "phoneNo": phone,
                "status": a
            }
        })
            .then((data) => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteRow = (phone) => {
        this.setState({ delLoad: true });
        console.log(phone);
        let current_emps = [...this.state.emps];

        axios('/.netlify/functions/deleteEmployee', {
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
                            {(this.state.isActive === 'true') ? (
                                <div className="mb-3">
                                    <Link to={'/add-employee/' + this.state.id} className="btn btn-primary primary-btn-x">Add New</Link   >
                                    <a className="btn btn-primary primary-btn float-right">Import CSV</a>
                                </div>
                            ) : (
                                    <div className="mb-3">
                                        <span className="info">Subscribe to add employees.</span>
                                    </div>
                                )}

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
