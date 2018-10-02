import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CallToActionBanner from "components/call-to-action-banner";
import Spinner from "components/spinner/loading";
import Video from "components/video";

const updateVideosList = function(videosList) {
  const videos = _.map(videosList, item =>
    _.extend({}, item, { created: moment(item.created).valueOf() })
  );
  return _.orderBy(videos, ["created"], ["desc"]);
};

class Videos extends Component {
  state = {};

  componentDidMount() {
    this.getVideos();
  }

  getVideos() {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/videos`,
      method: "get"
    };

    return axios(options)
      .then(({ data }) => {
        this.setState({
          recentVideos: updateVideosList(data.data)
        });
      })
      .catch(error => {
        console.log(`videos error: ${error}`); // eslint-disable-line no-console
      });
  }

  renderRecentVideos() {
    const { recentVideos } = this.state;

    if (!_.isArray(recentVideos)) return <Spinner />;
    if (recentVideos.length === 0) return null;

    return (
      <div>
        {recentVideos.map(item => (
          <Video key={item.id} content={item} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        <CallToActionBanner />
        {this.renderRecentVideos()}
      </div>
    );
  }
}

export default Videos;
