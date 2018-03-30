import React, {Component} from 'react';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import GenericNotFound from 'components/errors/genericnotfound';

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <div id='main'>
          <Header {...this.props} />

          <GenericNotFound />

          <Footer />

          <a className='to-top'>
            <i className='fa fa-angle-up' />
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
