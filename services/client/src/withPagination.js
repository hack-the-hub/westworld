import React from "react";
import WayPoint from "react-waypoint";
import Spinner from "components/spinner/loading";

const withPagination = url => Component => {
  class Pagination extends React.Component {
    pageSize = 50;

    fetch = () => {
      const {
        pageSize,
        props: { fetchData, page }
      } = this;

      return fetchData(`${url}?page=${page}&page_size=${pageSize}`);
    };

    render() {
      const { isLoading, hasMoreItems } = this.props;
      return (
        <React.Fragment>
          <Component {...this.props} />
          {hasMoreItems && <WayPoint onEnter={this.fetch} />}
          {isLoading && <Spinner centered={false} />}
        </React.Fragment>
      );
    }
  }

  return Pagination;
};

export default withPagination;
