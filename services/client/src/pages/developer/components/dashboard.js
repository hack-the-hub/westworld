import React, { Component } from "react";

class Dashboard extends Component {
    render() {
        return (
            <div className="list-single-facts fl-wrap gradient-bg">
                <div className="inline-facts-wrap">
                    <div className="inline-facts">
                        <i className="fa fa-home" />
                        <div className="milestone-counter">
                            <div className="stats animaper">
                                <div
                                    className="num"
                                    data-content="0"
                                    data-num="45"
                                >
                                    0
                                </div>
                            </div>
                        </div>
                        <h6>Hotel Rooms</h6>
                    </div>
                </div>

                <div className="inline-facts-wrap">
                    <div className="inline-facts">
                        <i className="fa fa-male" />
                        <div className="milestone-counter">
                            <div className="stats animaper">
                                <div
                                    className="num"
                                    data-content="0"
                                    data-num="2557"
                                >
                                    0
                                </div>
                            </div>
                        </div>
                        <h6>Happy customers every year</h6>
                    </div>
                </div>

                <div className="inline-facts-wrap">
                    <div className="inline-facts">
                        <i className="fa fa-cutlery" />
                        <div className="milestone-counter">
                            <div className="stats animaper">
                                <div
                                    className="num"
                                    data-content="0"
                                    data-num="5"
                                >
                                    0
                                </div>
                            </div>
                        </div>
                        <h6>Restorans Inside</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
