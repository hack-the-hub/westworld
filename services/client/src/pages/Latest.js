import React, { Component } from "react";
import axios from "axios";
import CallToActionBanner from "../components/CallToActionBanner";
import Content from "../components/Content";
import Pagination from "../components/Pagination";

import _ from "lodash";

class Latest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latest: []
    };
  }

  componentDidMount() {
    this.getLatest();
  }

  getLatest = e => {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`,
      method: "get"
    };
    return axios(options)
      .then(res => {
        const latest = res.data.data.events;
        const sortedLatest = _.orderBy(latest, ["time"], ["desc"]);
        this.setState({ latest: sortedLatest });
      })
      .catch(error => {
        console.log("latest error: " + error);
      });
  };

  renderLatest() {
    const latest = this.state.latest;
    return latest.map(el => {
      const {
        id,
        name,
        description,
        created,
        event_url,
        photo_url,
        group_name,
        status
      } = el;
      return (
        <Content
          key={id}
          id={id}
          name={name}
          description={description}
          created={created}
          event_url={event_url}
          photo_url={photo_url}
          status={status}
          groupName={group_name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <CallToActionBanner />
        {this.renderLatest()}
        <Pagination />
      </div>
    );
  }
}

export default Latest;
