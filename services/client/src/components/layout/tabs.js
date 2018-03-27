import React, { Component } from "react";
import { Link } from "react-router-dom";

// propTypes: {
//   selected: React.PropTypes.number,
//   children: React.PropTypes.oneOfType([
//     React.PropTypes.array,
//     React.PropTypes.element
//   ]).isRequired
// },

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  handleClick(index, event) {
    event.preventDefault();
    this.setState({ selected: index });
  }

  _renderTitles() {
    function labels(child, index) {
      const activeClass = this.state.selected === index ? "active" : "";
      return (
        <li key={index}>
          <Link
            to="/"
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}
          >
            {child.props.label}
          </Link>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  _renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  render() {
    return (
      <div id="tabs-container">
        <ul className="tabs-menu">{this._renderTitles()}</ul>
        <div className="tabs_container">{this._renderContent()}</div>
      </div>
    );
  }
}

export default Tabs;
