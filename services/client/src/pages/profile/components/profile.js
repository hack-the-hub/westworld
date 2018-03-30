import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ProfileUpload from './profile-upload';
import ProfileEdit from './profile-edit';

class Profile extends Component {
  render() {
    return (
      <section>
        <div className='container'>
          <div className='profile-edit-wrap'>
            <div className='profile-edit-page-header'>
              <h2>Edit profile</h2>
              <div className='breadcrumbs'>
                <Link to='/'>Home</Link>
                <Link to='/profile'>Dasboard</Link>
                <span>Edit profile</span>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-3'>
                <div className='fixed-bar fl-wrap'>
                  <div className='user-profile-menu-wrap fl-wrap'>
                    <div className='user-profile-menu'>
                      <h3>Main</h3>
                      <ul>
                        <li>
                          <Link to='/profile' className='user-profile-act'>
                            <i className='fa fa-user-o' />
                            Edit profile
                          </Link>
                        </li>
                        <li>
                          <Link to='/messages'>
                            <i className='fa fa-envelope-o' />
                            Messages
                            <span>3</span>
                          </Link>
                        </li>
                        <li>
                          <Link to='/password'>
                            <i className='fa fa-unlock-alt' />Change Password
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className='user-profile-menu'>
                      <h3>Listings</h3>
                      <ul>
                        <li>
                          <Link to='dashboard-listing-table'>
                            <i className='fa fa-th-list' />
                            My listigs
                          </Link>
                        </li>
                        <li>
                          <Link to='dashboard-bookings'>
                            <i className='fa fa-calendar-check-o' />
                            Bookings
                            <span>2</span>
                          </Link>
                        </li>
                        <li>
                          <Link to='dashboard-review'>
                            <i className='fa fa-comments-o' />
                            Reviews
                          </Link>
                        </li>
                        <li>
                          <Link to='dashboard-add-listing'>
                            <i className='fa fa-plus-square-o' />
                            Add New
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <Link to='#' className='log-out-btn'>
                      Log Out
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-md-7'>
                <ProfileEdit />
              </div>
              <div className='col-md-2'>
                <ProfileUpload />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
