import React, { Component } from "react";

class Reservation extends Component {
    render() {
        return (
            <div className="box-widget-item fl-wrap">
                <div className="box-widget-item-header">
                    <h3>Book a Reservation:</h3>
                </div>
                <div className="box-widget opening-hours">
                    <div className="box-widget-content">
                        <form className="add-comment custom-form">
                            <fieldset>
                                <label>
                                    <i className="fa fa-user-o" />
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    value=""
                                />
                                <div className="clearfix" />
                                <label>
                                    <i className="fa fa-envelope-o" />
                                </label>
                                <input
                                    type="text"
                                    placeholder="Email Address*"
                                    value=""
                                />
                                <div className="quantity fl-wrap">
                                    <span>
                                        <i className="fa fa-user-plus" />Persons
                                        :
                                    </span>
                                    <div className="quantity-item">
                                        <input
                                            type="button"
                                            value="-"
                                            className="minus"
                                        />
                                        <input
                                            type="text"
                                            name="quantity"
                                            value="1"
                                            title="Qty"
                                            className="qty"
                                            size="4"
                                        />
                                        <input
                                            type="button"
                                            value="+"
                                            className="plus"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>
                                            <i className="fa fa-calendar-check-o" />
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Date"
                                            className="datepicker"
                                            data-large-mode="true"
                                            data-large-default="true"
                                            value=""
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>
                                            <i className="fa fa-clock-o" />
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Time"
                                            className="timepicker"
                                            value="12:00 am"
                                        />
                                    </div>
                                </div>
                                <textarea
                                    cols="40"
                                    rows="3"
                                    placeholder="Additional Information:"
                                />
                            </fieldset>
                            <button className="btn  big-btn  color-bg flat-btn">
                                Book Now<i className="fa fa-angle-right" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reservation;
