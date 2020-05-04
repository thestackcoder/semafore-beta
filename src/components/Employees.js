import React, { Component } from 'react'
import SideNav from './ClientSidebar/SideNav';
import { Link } from 'wouter';
import DataTable from 'react-data-table-component';


class Employees extends Component {
    state = {
        loading: true,
        msg: null,
        isActive: false,
        orgs: [{ name: "John Doe", phone: "+12385934545", phone_type: 'android', joined_date: "2020-07-03" }],
        toggledClearRows: false,
        rowsData: []
    }

    columns = [
        {
            name: 'Employee Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: 'phone',
            sortable: true,
        },
        {
            name: 'Phone Type',
            selector: 'phone_type',
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
                <Link className="btn btn-success btn-sm">Edit</Link>
                    &nbsp; &nbsp;
                <button className="btn btn-danger btn-sm">Delete</button>

            </div>,
        }

    ]

    handleClearRows = () => {
        this.setState({ toggledClearRows: !this.state.toggledClearRows });
    }

    handleCheckClick = () => {
        let active = !this.state.isActive;
        console.log(active);
        this.setState({ isActive: active });
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
                        <div className="das m-auto">Employees</div>
                    </nav>
                    <div className="container">
                        <div className="row mt-2">
                            <div className="col-12">
                                <div className="mb-3">
                                    <button className="btn btn-default">Add New</button>
                                    <button className="btn btn-default float-right">Import CSV</button>
                                </div>
                                <div className="firm-box">
                                    <h5>All Employees</h5>
                                    {/* <Etable data={this.dataSet}></Etable>*/}
                                    <DataTable
                                        columns={this.columns}
                                        selectableRows // add for checkbox selection
                                        data={this.state.orgs}
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
            </div>
        )
    }
}

export default Employees;
