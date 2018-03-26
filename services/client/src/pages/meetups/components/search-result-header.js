import React, { Component } from "react";

class SearchResultHeader extends Component {
    render() {
        return (
            <div className="listsearch-header fl-wrap">
                <h3>
                    Results For: &nbsp;
                    <span>All Meetups</span>
                </h3>
            </div>
        );
    }
}

export default SearchResultHeader;
