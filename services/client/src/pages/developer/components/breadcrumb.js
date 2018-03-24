import React, { Component } from "react";

class Breadcrumb extends Component {
    render() {
        return (
            <div className="breadcrumbs gradient-bg  fl-wrap">
                <a href="#">Home</a>
                <a href="#">Listings</a>
                <span>Listing Single</span>
            </div>
        );
    }
}

export default Breadcrumb;
