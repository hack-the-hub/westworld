import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import logo from 'images/logo.png';

class Footer extends Component {
  render() {
    return (
      <footer className='main-footer dark-footer  '>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='footer-widget fl-wrap'>
                <h3>About Us</h3>
                <div className='footer-contacts-widget fl-wrap'>
                  <p>
                    In ut odio libero, at vulputate urna. Nulla tristique mi a
                    massa convallis cursus. Nulla eu mi magna. Etiam suscipit
                    commodo gravida. Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit, sed diam.{' '}
                  </p>
                  <ul className='footer-contacts fl-wrap'>
                    <li>
                      <span>
                        <i className='fa fa-envelope-o' /> Mail :
                      </span>
                      <Link to='/'>yourmail@domain.com</Link>
                    </li>
                    <li>
                      {' '}
                      <span>
                        <i className='fa fa-map-marker' /> Adress :
                      </span>
                      <Link to='/'>USA 27TH Brooklyn NY</Link>
                    </li>
                    <li>
                      <span>
                        <i className='fa fa-phone' /> Phone :
                      </span>
                      <Link to='/'>+7(111)123456789</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='footer-widget fl-wrap'>
                <h3>Our Last News</h3>
                <div className='widget-posts fl-wrap'>
                  <ul>
                    <li className='clearfix'>
                      <Link to='/' className='widget-posts-img'>
                        <img src='' className='respimg' alt='' />
                      </Link>
                      <div className='widget-posts-descr'>
                        <Link to='/' title=''>
                          Vivamus dapibus rutrum
                        </Link>
                        <span className='widget-posts-date'>
                          {' '}
                          21 Mar 09.05{' '}
                        </span>
                      </div>
                    </li>
                    <li className='clearfix'>
                      <Link to='/' className='widget-posts-img'>
                        <img src='' className='respimg' alt='' />
                      </Link>
                      <div className='widget-posts-descr'>
                        <Link to='/' title=''>
                          {' '}
                          In hac habitasse platea
                        </Link>
                        <span className='widget-posts-date'> 7 Mar 18.21 </span>
                      </div>
                    </li>
                    <li className='clearfix'>
                      <Link to='/' className='widget-posts-img'>
                        <img src='' className='respimg' alt='' />
                      </Link>
                      <div className='widget-posts-descr'>
                        <Link to='/' title=''>
                          Tortor tempor in porta
                        </Link>
                        <span className='widget-posts-date'> 7 Mar 16.42 </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='footer-widget fl-wrap'>
                <h3>Our Twitter</h3>
                <div id='footer-twiit' />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='footer-widget fl-wrap'>
                <h3>Subscribe</h3>
                <div className='subscribe-widget fl-wrap'>
                  <p>
                    Want to be notified when we launch a new template or an
                    udpate. Just sign up and we'll send you a notification by
                    email.
                  </p>
                  <div className='subcribe-form'>
                    <form id='subscribe'>
                      <input
                        className='enteremail'
                        name='email'
                        id='subscribe-email'
                        placeholder='Email'
                        spellCheck='false'
                        type='text'
                      />
                      <button
                        type='submit'
                        id='subscribe-button'
                        className='subscribe-button'
                      >
                        <i className='fa fa-rss' /> Subscribe
                      </button>
                      <label
                        htmlFor='subscribe-email'
                        className='subscribe-message'
                      />
                    </form>
                  </div>
                </div>
                <div className='footer-widget fl-wrap'>
                  <div className='footer-menu fl-wrap'>
                    <ul>
                      <li>
                        <Link to='/'>Home </Link>
                      </li>
                      <li>
                        <Link to='/'>Blog</Link>
                      </li>
                      <li>
                        <Link to='/'>Listing</Link>
                      </li>
                      <li>
                        <Link to='/'>Contacts</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sub-footer fl-wrap'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='about-widget'>
                  <img src={logo} alt='' />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='copyright'>
                  {' '}
                  &#169; CityBook 2018 . All rights reserved.
                </div>
              </div>
              <div className='col-md-4'>
                <div className='footer-social'>
                  <ul>
                    <li>
                      <Link to='/'>
                        <i className='fa fa-facebook-official' />
                      </Link>
                    </li>
                    <li>
                      <Link to='/'>
                        <i className='fa fa-twitter' />
                      </Link>
                    </li>
                    <li>
                      <Link to='/'>
                        <i className='fa fa-chrome' />
                      </Link>
                    </li>
                    <li>
                      <Link to='/'>
                        <i className='fa fa-vk' />
                      </Link>
                    </li>
                    <li>
                      <Link to='/'>
                        <i className='fa fa-whatsapp' />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
