import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class Tabs extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  handleClick(index, event) {
    event.preventDefault();
    this.setState({selected: index});
  }

  renderTitles() {
    function labels(child, index) {
      const activeClass = this.state.selected === index ? 'active' : '';
      return (
        <li key={index}>
          <Link
            to='/'
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}
          >
            {child.props.label}
          </Link>
        </li>
      );
    }
    return (
      <ul className='tabs__labels'>
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  }

  renderContent() {
    return (
      <div className='tabs__content'>
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  render() {
    return (
      <div id='tabs-container'>
        <ul className='tabs-menu'>{this.renderTitles()}</ul>
        <div className='tabs_container'>{this.renderContent()}</div>
      </div>
    );
  }
}

export default Tabs;
