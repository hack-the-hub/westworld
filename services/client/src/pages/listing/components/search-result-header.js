import React, {Component} from "react";

class SearchResultHeader extends Component {
  render() {
    return (<div className="listsearch-header fl-wrap">
      <h3>
        Results For:
        <span>
          All Listings
        </span>
      </h3>
      <div className="listing-view-layout">
        <ul>
          <li>
            <a className="grid active" href="#">
              <i className="fa fa-th-large"/>
            </a>
          </li>
          <li>
            <a className="list" href="#">
              <i className="fa fa-list-ul"/>
            </a>
          </li>
        </ul>
      </div>
    </div>);
  }
}

export default SearchResultHeader;
