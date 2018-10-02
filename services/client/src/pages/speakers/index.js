import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CallToActionBanner from "components/call-to-action-banner";
import Spinner from "components/spinner/loading";
import Speaker from "components/speaker";

const updateSpeakersList = function(speakersList) {
  const speakers = _.map(speakersList, item =>
    _.extend({}, item, { created: moment(item.created).valueOf() })
  );
  return _.orderBy(speakers, ["name"], ["asc"]);
};

class Speakers extends Component {
  state = {};

  componentDidMount() {
    this.getSpeakers();
  }

  getSpeakers() {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/speakers`,
      method: "get"
    };

    return axios(options)
      .then(({ data }) => {
        this.setState({
          recentSpeakers: updateSpeakersList(data.data)
        });
      })
      .catch(error => {
        console.log(`speakers error: ${error}`); // eslint-disable-line no-console
      });
  }

  renderRecentSpeakers() {
    const { recentSpeakers } = this.state;

    if (!_.isArray(recentSpeakers)) return <Spinner />;
    if (recentSpeakers.length === 0) return null;

    return (
      <div>
        {recentSpeakers.map(item => (
          <Speaker key={item.id} content={item} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        <CallToActionBanner />
        {this.renderRecentSpeakers()}
      </div>
    );
  }
}

export default Speakers;
