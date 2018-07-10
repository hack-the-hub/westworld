import React from "react";
import PropTypes from "prop-types";

const getSourceIcon = source => {
  if (source === "youtube")
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/2000px-YouTube_social_white_square_%282017%29.svg.png";
  return undefined;
};

const sharedStyles = `
  text-align: center;
  margin-top: 0.5rem;
  width: 35px;
`;

const Icon = ({ source }) => {
  const sourceImage = getSourceIcon(source);
  if (sourceImage) {
    return (
      <React.Fragment>
        <style jsx>{`
          img {
            ${sharedStyles};
          }
        `}</style>
        <img src={sourceImage} alt={`${source} icon`} />
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
      <i className="fa fa-calendar-o" alt="Video icon" />
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
