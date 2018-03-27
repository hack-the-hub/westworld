import React, { Component } from "react";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import Description from "./components/description";
import LocationInformation from "./components/location-information";
import Communtity from "components/shared/community";
import { developers } from "../../data";

class DeveloperPage extends Component {
  render() {
    const { id } = this.props.match.params;
    const developer = developers.find(developer => developer.id === id);

    return (
      <div>
        <div id="main">
          <Header {...this.props} />

          <div id="wrapper">
            <div className="content">
              <section className="gray-section no-top-padding">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="box-widget-wrap">
                        <LocationInformation developer={developer} />
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div
                        className="list-single-main-wrapper fl-wrap"
                        id="sec2"
                      >
                        <Description developer={developer} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="limit-box fl-wrap" />

              <Communtity />
            </div>
          </div>

          <Footer />

          <a className="to-top">
            <i className="fa fa-angle-up" />
          </a>
        </div>
      </div>
    );
  }
}

export default DeveloperPage;
