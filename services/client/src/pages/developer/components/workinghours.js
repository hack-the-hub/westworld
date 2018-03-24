import React, { Component } from "react";

class WorkingHours extends Component {
    render() {
        return (
            <div className="box-widget-item fl-wrap">
                <div className="box-widget-item-header">
                    <h3>Working Hours :</h3>
                </div>
                <div className="box-widget opening-hours">
                    <div className="box-widget-content">
                        <span className="current-status">
                            <i className="fa fa-clock-o" />
                            Now Open
                        </span>
                        <ul>
                            <li>
                                <span className="opening-hours-day">
                                    Monday
                                </span>
                                <span className="opening-hours-time">
                                    9 AM - 5 PM
                                </span>
                            </li>
                            <li>
                                <span className="opening-hours-day">
                                    Tuesday
                                </span>
                                <span className="opening-hours-time">
                                    9 AM - 5 PM
                                </span>
                            </li>
                            <li>
                                <span className="opening-hours-day">
                                    Wednesday
                                </span>
                                <span className="opening-hours-time">
                                    9 AM - 5 PM
                                </span>
                            </li>
                            <li>
                                <span className="opening-hours-day">
                                    Thursday
                                </span>
                                <span className="opening-hours-time">
                                    9 AM - 5 PM
                                </span>
                            </li>
                            <li>
                                <span className="opening-hours-day">
                                    Friday
                                </span>
                                <span className="opening-hours-time">
                                    9 AM - 5 PM
                                </span>
                            </li>
                            <li>
                                <span className="opening-hours-day">
                                    Saturday
                                </span>
                                <span className="opening-hours-time">
                                    9 AM - 3 PM
                                </span>
                            </li>
                            <li>
                                <span className="opening-hours-day">
                                    Sunday
                                </span>
                                <span className="opening-hours-time">
                                    Closed
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkingHours;
