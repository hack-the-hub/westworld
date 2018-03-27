import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends Component {
  render() {
    return (
      <div className='pagination'>
        <Link to='#' className='prevposts-link'>
          <i className='fa fa-caret-left' />
        </Link>
        <Link to='#' className='blog-page current-page transition'>
          1
        </Link>
        <Link to='#' className='blog-page transition'>
          2
        </Link>
        <Link to='#' className='blog-page transition'>
          3
        </Link>
        <Link to='#' className='blog-page transition'>
          4
        </Link>
        <Link to='#' className='nextposts-link'>
          <i className='fa fa-caret-right' />
        </Link>
      </div>
    );
  }
}

export default Pagination;
