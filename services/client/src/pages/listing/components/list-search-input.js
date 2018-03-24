import React, {Component} from "react";

class ListSearchInput extends Component {
  render() {
    return (<div className="listsearch-input-wrap fl-wrap">
      <div className="listsearch-input-item">
        <i className="mbri-key single-i"/>
        <input type="text" placeholder="Keywords?" value=""/>
      </div>

      <div className=" fl-wrap filter-tags">
        <h4>
          Filter by Tags
        </h4>
        <div className="filter-tags-wrap">
          <input id="check-a" type="checkbox" name="check"/>
          <label for="check-a">
            Python
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-b" type="checkbox" name="check"/>
          <label for="check-b">
            Java
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-c" type="checkbox" name="check"/>
          <label for="check-c">
            Go
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-d" type="checkbox" name="check"/>
          <label for="check-d">
            Javascript
          </label>
        </div>
      </div>

      <button className="button fs-map-btn">
        Filter Search
      </button>
    </div>);
  }
}

export default ListSearchInput;
