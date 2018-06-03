import React, {Component} from 'react';
import axios from 'axios';
import CallToActionBanner from '../components/CallToActionBanner';
import Content from '../components/Content';
import Pagination from '../components/Pagination';

import _ from 'lodash';

class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = (e) => {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`,
      method: 'get'
    };
    return axios(options).then(res => {
      const events = res.data.data.events;
      const sortedEvents = _.orderBy(events, ['time'], ['desc']);
      this.setState({ events: sortedEvents});
    }).catch(error => {
      console.log(error);
    });
  };

  renderEvents() {
    const events = this.state.events;
    return events.map(el => {
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
      return (<Content key={id} id={id} name={name} description={description} created={created} event_url={event_url} photo_url={photo_url} status={status} groupName={group_name}/>);
    });
  }

  render() {
    return (<div>
      <CallToActionBanner/>
      {this.renderEvents()}
      <Pagination/>
    </div>);
  }
}

export default Events;
