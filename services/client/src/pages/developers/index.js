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
  return _.orderBy(developers, ["name"], ["asc"]);
};

class Developers extends Component {
  state = {};

  componentDidMount() {
    // this.getDevelopers();

    this.setState({
      recentDevelopers: updateDevelopersList([
        {
          id: "ba2a42b5-5a55-4a1c-99ce-bfbfdf847029",
          source: "github",
          created: "2017-06-22T10:53:09",
          updated: "2018-10-12T19:27:00",
          topics: [],
          deleted: null,
          avatarUrl: "https://avatars2.githubusercontent.com/u/856858?v=4",
          login: "martinwoodward",
          name: "Martin Woodward",
          location: "Belfast",
          github_id: 856858,
          publicGists: 2,
          publicRepos: 36,
          url: "https://api.github.com/users/martinwoodward",
          followers: 205,
          company: "@Microsoft and @dotnet",
          blog: "http://woodwardweb.com",
          bio: "Vice President of the .NET Foundation (@dotnet). Previous to that  he was the original creator of the @Microsoft org"
        },
        {
          id: "ba2a42b5-5a55-4a1c-99ce-bfbfdf847029",
          source: "github",
          created: "2017-06-22T10:53:09",
          updated: "2018-10-12T19:27:00",
          topics: [],
          deleted: null,
          avatarUrl: "https://avatars2.githubusercontent.com/u/1443700?s=96&v=4",
          login: "apoclyps",
          name: "Kyle Harrison",
          location: "Belfast",
          github_id: 856858,
          publicGists: 1,
          publicRepos: 4,
          url: "https://api.github.com/users/apoclyps",
          followers: 205,
          company: "",
          blog: "",
          bio: "Programmer, Tech Enthusiast, Maker, Geeky Dad from Belfast"
        }
      ])
    });
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
