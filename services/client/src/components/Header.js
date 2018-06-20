import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    const iconStyle = {
      height: "30px",
      fontSize: "1.5em",
      color: "white"
    };
    const title = {
      top: "-0.15rem",
      position: "relative",
      left: "0.3rem",
      fontSize: "20px"
    };
    const navLink = {
      top: "0.25rem",
      position: "relative",
      left: "0.3rem"
    };
    return (
      <div className="bg-blue flex lg:mt-4 p-2 rounded-t">
        <div className="mt-1 ml-2">
          <Link className="text-white no-underline" to="/">
            <i className="fa fa-chevron-right fa-3" style={iconStyle} alt="" />
            <span className="title" style={title}>
              Muxer
            </span>
          </Link>
        </div>
        <ul className="list-reset flex flex-wrap mt-1 ml-4">
          <li className="mr-6" style={navLink}>
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
