import React, {Component} from "react";

class ListSearchInput extends Component {
  render() {
    return (<div className="listsearch-input-wrap fl-wrap listsearch-input-clearfix">
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
            Java
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-b" type="checkbox" name="check"/>
          <label for="check-b">
            Python
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-c" type="checkbox" name="check"/>
          <label for="check-c">
            Javascript
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-d" type="checkbox" name="check"/>
          <label for="check-d">
            Ruby
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-a" type="checkbox" name="check"/>
          <label for="check-a">
            C#
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-a" type="checkbox" name="check"/>
          <label for="check-a">
            CSS3
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-a" type="checkbox" name="check"/>
          <label for="check-a">
            Ruby on Rails
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-a" type="checkbox" name="check"/>
          <label for="check-a">
            Swift
          </label>
        </div>
        <div className="filter-tags-wrap">
          <input id="check-a" type="checkbox" name="check"/>
          <label for="check-a">
            Angular
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
