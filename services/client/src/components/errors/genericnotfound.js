import React, { Component } from "react";
import { Link } from "react-router-dom";

class GenericNotFound extends Component {
  render() {
    return (
      <div id="wrapper">
        <div class="content">
          <section id="sec1">
            <div className="overlay" />
            <div className="bubble-bg" />
            <div className="container">
              <div className="error-wrap">
                <h2>404</h2>
                <p>
                  We're sorry, but the Page you were looking for, couldn't be
                  found.
                </p>

                <div className="clearfix" />
                <p>Or</p>
                <a
                  href="index.html"
                  className="btn  big-btn  color-bg flat-btn"
                >
                  Back to Home Page<i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </section>

          <section className="gradient-bg">
            <div className="container">
              <div className="join-wrap fl-wrap">
                <div className="row">
                  <div className="col-md-8">
                    <h3>Join our online community</h3>
                    <p>
                      Grow your marketing and be happy with your online business
                    </p>
                  </div>
                  <div className="col-md-4">
                    <Link to="/" className="join-wrap-btn modal-open">
                      Sign Up
                      <i className="fa fa-sign-in" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="limit-box" />
        </div>
      </div>
    );
  }
}

export default GenericNotFound;
