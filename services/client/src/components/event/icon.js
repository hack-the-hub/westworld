import React from "react";
import PropTypes from "prop-types";

const getSourceIcon = source => {
  const baseUrl = "https://s3-eu-west-1.amazonaws.com/muxer-images";
  if (source === "eventbrite") return `${baseUrl}/eventbrite.png`;
  if (source === "meetup") return `${baseUrl}/meetup.jpg`;
  if (source === "nisciencefestival") return `${baseUrl}/nisf.jpg`;
  if (source === "farsetlabs") return `${baseUrl}/farsetlabs.jpg`;
  return undefined;
};

const sharedStyles = `
  text-align: center;
  margin-top: 0.5rem;
  width: 35px;
`;

const Icon = ({ source }) => {
  const eventSourceImage = getSourceIcon(source);
  if (eventSourceImage) {
    return (
      <React.Fragment>
        <style jsx>{`
          img {
            ${sharedStyles};
          }
        `}</style>
        <img src={eventSourceImage} alt={`${source} icon`} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <style jsx>{`
        i {
          ${sharedStyles};
        }
      `}</style>
      <i className="fa fa-calendar-o" alt="Event icon" />
    </React.Fragment>
  );
};

Icon.propTypes = {
  source: PropTypes.string
};

Icon.defaultProps = {
  source: undefined
};

export default Icon;
