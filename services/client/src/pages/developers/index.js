import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CallToActionBanner from "components/call-to-action-banner";
import Spinner from "components/spinner/loading";
import Developer from "components/developer";

const updateDevelopersList = function(developersList) {
  const developers = _.map(developersList, item =>
    _.extend({}, item, { created: moment(item.created).valueOf() })
  );
  return _.orderBy(developers, ["repositories"], ["desc"]);
};

class Developers extends Component {
  state = {};

  componentDidMount() {
    this.getDevelopers();
  }

  getDevelopers() {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/developers`,
      method: "get"
    };

    return axios(options)
      .then(({ data }) => {
        this.setState({
          recentDevelopers: updateDevelopersList(data.data)
        });
      })
      .catch(error => {
        console.log(`developers error: ${error}`); // eslint-disable-line no-console
      });
  }

  renderRecentDevelopers() {
    const { recentDevelopers } = this.state;

    if (!_.isArray(recentDevelopers)) return <Spinner />;
    if (recentDevelopers.length === 0) return null;

    return (
      <div>
        {recentDevelopers.map(item => (
          <Developer key={item.id} content={item} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        <CallToActionBanner />
        {this.renderRecentDevelopers()}
      </div>
    );
  }
}

export default Developers;
