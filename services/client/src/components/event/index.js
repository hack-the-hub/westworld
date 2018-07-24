import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import Content from "./content";
import styles from "./styles";

const Event = ({ className, content }) => {
  const { id, name, start, url, category, source } = content;

  return (
    <div className={`event ${className}`}>
      <style jsx>{styles}</style>
      <div className="event-icon">
        <Icon source={source} />
      </div>
      <div className="event-content">
        <Content
          id={id}
          name={name}
          start={start}
          url={url}
          category={category}
        />
      </div>
    </div>
  );
};

Event.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  }).isRequired
};

Event.defaultProps = {
  className: ""
};

export default Event;
