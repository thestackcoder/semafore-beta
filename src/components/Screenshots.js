import React, { Component } from 'react'

class Employees extends Component {

    dataSet = [
        [
            "James Franco",
            "+34329498923",
            "https://semafore.io/icon.png",
            "12-02-2019",
            ""
        ],
        [
            "James Franco",
            "+34329498923",
            "https://semafore.io/icon.png",
            "12-02-2019",
            ""
        ],
    ]

    render() {
        return (
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                    <div className="das m-auto">Screenshots</div>
                </nav>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="firm-box">
                                <h5>All Screenshots</h5>
                                {/* <Etable data={this.dataSet}></Etable>                             */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Employees;
