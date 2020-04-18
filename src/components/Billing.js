import React, { Component } from 'react'
import SideNav from './Sidebar/SideNav';
import "../stylesheets/togglecheck.css";

class Organization extends Component {

    dataSet = [
        [
            "Nikon",
            "Y5674",
            "14-02-2019",
            "<label class='switch'><input type='checkbox' checked><span class='slider'></span></label>"
        ],
        [
            "Addidas",
            "Y5675",
            "24-05-2019",
            "<label class='switch'><input type='checkbox' checked><span class='slider'></span></label>"
        ],
        [
            "Nike",
            "Y5676",
            "05-09-2019",
            "<label class='switch'><input type='checkbox' checked><span class='slider'></span></label>"
        ],
        [
            "Canon",
            "Y5677",
            "06-02-2020",
            "<label class='switch'><input type='checkbox'><span class='slider'></span></label>"
        ],
    ]

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
