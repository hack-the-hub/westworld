import React from "react";
import moment from "moment";

class Content extends React.Component {
  renderCreatedTime(created) {
    const formatedCreated = moment.utc(created).toNow();
    return <span className="text-grey-light italic">{formatedCreated}</span>;
  }

  render() {
    const { id, name, groupName, created, event_url } = this.props;
    const iconStyle = {
      height: "32px",
      fontSize: "1.5em"
    };

    return (
      <div
        id={id}
        className="bg-white border border-grey-lightest flex p-2 shadow-light hover:shadow"
      >
        <div className="ml-2">
          <i
            className="rounded-full mt-2 fa fa-calendar-o"
            style={iconStyle}
            alt=""
          />
        </div>
        <div className="w-3/4">
          <div className="ml-4 mt-1">
            <div className="mb-2">
              <a
                className="text-lg text-black font-thin no-underline"
                href={event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            </div>
            <div className="text-xs text-grey">
              <span style={{ paddingRight: "1rem" }}>{groupName}</span>
              {this.renderCreatedTime(created)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
