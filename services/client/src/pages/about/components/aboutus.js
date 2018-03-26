import React, { Component } from "react";

class AboutUS extends Component {
    render() {
        return (
          <section  id="sec2">
  <div className="container">
      <div className="section-title">
          <h2>Contribute towards my dev space</h2>
          <div className="section-subtitle">popular questions</div>
          <span className="section-separator"></span>
          <p>Explore some of the best meetups from around the city created and shared by local developers.</p>
      </div>
      <div className="time-line-wrap fl-wrap">
          <div className="time-line-container">
              <div className="step-item">Step 1</div>
              <div className="time-line-box tl-text tl-left">
                  <span className="process-count">01 . </span>
                  <div className="time-line-icon">
                      <i className="fa fa-user-plus"></i>
                  </div>
                  <h3>Sign Up</h3>
                  <p>Joining my space dev will allow you to meet influential developers in the area and attend relevant meetups that relate to you.</p>
              </div>
              <div className="time-line-box tl-media tl-right">
                  <img src="images/all/1.jpg" alt=""/>
              </div>
          </div>
          <div className="time-line-container lf-im">
              <div className="step-item">Step 2</div>
              <div className="time-line-box tl-text tl-right">
                  <span className="process-count">02 . </span>
                  <div className="time-line-icon">
                      <i className="fa fa-address-card"></i>
                  </div>
                  <h3>Add your content</h3>
                  <p>Tell us about yourself to allow us to better match meetups and developers with similiar shared skills.</p>
              </div>
              <div className="time-line-box tl-media tl-left">
                  <img src="images/all/1.jpg" alt=""/>
              </div>
          </div>
          <div className="time-line-container">
              <div className="step-item">Step 3</div>
              <div className="time-line-box tl-text tl-left">
                  <span className="process-count">03 . </span>
                  <div className="time-line-icon">
                      <i className="fa fa-search"></i>
                  </div>
                  <h3>View your developer space</h3>
                  <p>Our recommendation enginae will use the content you supply to us alongside our own unsupervised machine learning to help guide you towards relevant interests.</p>
              </div>
              <div className="time-line-box tl-media tl-right">
                  <img src="images/all/1.jpg" alt=""/>
              </div>
          </div>

          <div className="timeline-end"><i className="fa fa-check"></i></div>
      </div>
  </div>
</section>
        );
    }
}

export default AboutUS;
