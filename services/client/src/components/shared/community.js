import React, { Component } from "react";

class Community extends Component {
  render() {
    return (
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
                <a href="#" className="join-wrap-btn modal-open">
                  Sign Up
                  <i className="fa fa-sign-in" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Community;
