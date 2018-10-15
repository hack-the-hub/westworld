import React from "react";
import WayPoint from "react-waypoint";
import Spinner from "components/spinner/loading";

const withPagination = url => Component => {
  class Pagination extends React.Component {
    state = {
      page: 1,
      pageSize: 50
    };

    fetchMore = () => {
      const {
        props: { fetchData, hasMoreItems },
        state: { page, pageSize }
      } = this;

      fetchData(`${url}?page=${page}&page_size=${pageSize}`).then(() => {
        if (!hasMoreItems) return;
        this.setState(currentState => ({ page: currentState.page + 1 }));
      });
    };

    render() {
      const { isLoading, hasMoreItems } = this.props;
      return isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Component {...this.props} />
          {hasMoreItems && <WayPoint onEnter={this.fetchMore} />}
        </React.Fragment>
      );
    }
  }

  return Pagination;
};

export default withPagination;
