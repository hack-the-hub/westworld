import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="bg-blue flex lg:mt-4 p-2 rounded-t">
        <div className="mt-1 ml-2">
          <Link className="text-white no-underline" to="/">
            <i className="fa fa-chevron-right fa-3 homepage-icon" alt="" />
            <span className="homepage-title">
              Muxer
            </span>
          </Link>
        </div>
        <ul className="list-reset flex flex-wrap mt-1 ml-4">
          <li className="mr-6 nav-bar-link">
            <Link to="/event" className="text-grey-light hover:text-white">
              events
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
