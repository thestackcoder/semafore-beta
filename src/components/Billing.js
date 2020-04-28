import React, { Component } from 'react'
import SideNav from './Sidebar/SideNav';
import "../stylesheets/togglecheck.css";
import { Link } from 'wouter';
import DataTable from 'react-data-table-component';

class Billing extends Component {

    state = {
        loading: true,
        msg: null,
        isActive: false,
        orgs: [{ id: "21344534534534", name: "Adidas", transaction_id: "123HGhYU" }],
        toggledClearRows: false,
        rowsData: []
    }

    columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Payment Method',
            selector: 'transaction_id',
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
                <Link className="btn btn-success btn-sm">Subscribe</Link>
                    &nbsp; &nbsp;
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

export default Billing;
