import React, {Component} from 'react';

class Question extends Component {
  render() {
    return (
      <section className='gradient-bg'>
        <div className='container'>
          <div className='join-wrap fl-wrap'>
            <div className='row'>
              <div className='col-md-8'>
                <h3>Want to contribute to this project ?</h3>
                <p>
                  We welcome everyone to take part in building a better
                  developer network in Northern Ireland. You can contribute
                  ideas, time, or even open a pull request or raise issues on
                  our Github.
                </p>
              </div>
              <div className='col-md-4'>
                <a href='contacts.html' className='join-wrap-btn'>
                  Get In Touch
                  <i className='fa fa-envelope-o' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Question;
