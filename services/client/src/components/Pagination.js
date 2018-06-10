import React from "react";
import { Link } from "react-router-dom";

class Pagination extends React.Component {
  render() {
    return (
      <div className="bg-white border border-grey-lightest p-2 shadow-light">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link
              to="/event?page=1"
              className="rounded-l rounded-sm border border-brand-light px-3 py-2 cursor-not-allowed no-underline"
            >
              &laquo;
            </Link>
            <Link
              to="/event?page=1"
              className="border-t border-b border-l border-brand-light px-3 py-2 bg-brand-light no-underline"
            >
              1
            </Link>
            <Link
              to="/event?page=2"
              className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
            >
              2
            </Link>
            <Link
              to="/event?page=2"
              className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
            >
              2
            </Link>
            <Link
              to="/event?page=3"
              className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
            >
              3
            </Link>
            <Link
              to="/event?page=4"
              className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
            >
              4
            </Link>
            <Link
              to="/event?page=5"
              className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
            >
              5
            </Link>
            <span className="border-t border-b border-l border-brand-light px-3 py-2 cursor-not-allowed no-underline">
              ...
            </span>
            <Link
              to="/event?page=9"
              className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
            >
              9
            </Link>
            <Link
              to="/event?page=10"
              className="border-t border-b border-l border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
            >
              10
            </Link>
            <Link
              to="/event?page=10"
              className="rounded-r rounded-sm border border-brand-light px-3 py-2 hover:bg-brand-light text-brand-dark no-underline"
              rel="next"
            >
              &raquo;
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;
