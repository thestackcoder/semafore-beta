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
            status: ''
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
            cell: row =>
                <div>
                    <Link to={"/payment/" + row._id
                    } className="btn btn-success btn-sm" > Subscribe</Link>
                </div >
        }

    ]

    componentDidMount() {
        const id = this.props.id;
        this.setState({ id: id });

        axios.get('/.netlify/functions/readOrganization')
            .then((data) => {
                var res = data.data.data;
                this.setState({ status: data.data.status, loading: false, msg: data.data.msg, orgs: res });
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
                                    <div className="das m-auto">Billing</div>
                                </nav>
                                <div className="container">
                                    <div className="row mt-1">
                                        <div className="col-12">

                                            <div className="firm-box">
                                                <h5 className="heading">Billing Details</h5>
                                                <Link to={"/payment/" + this.state.id} className="btn btn-primary primary-btn">Add Subscription</Link>
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

export default OBilling;
