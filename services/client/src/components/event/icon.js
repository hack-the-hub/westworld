import React from "react";
import PropTypes from "prop-types";

const getSourceIcon = source => {
  if (source === "eventbrite")
    return "http://roblysupport.com/marketing/wp-content/uploads/2017/07/favicon-194x194.png";
  if (source === "meetup")
    return "https://assets.materialup.com/uploads/30b4082d-3390-44d6-973e-60ca8972f854/preview";
  if (source === "nisciencefestival")
    return "https://i2.wp.com/www.belfasttimes.co.uk/wp-content/uploads/2016/02/NISF2016_FINAL.jpg?fit=1181%2C1181";
  if (source === "farsetlabs")
    return "https://pbs.twimg.com/profile_images/984127270968324097/9tDrzLzv_400x400.jpg";
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
