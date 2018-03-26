import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./stylesheet/index.css";

class ListSearchInput extends Component {
    renderDescription(description) {
        if (!description) return null;

        const text = description.substring(0, 200);
        return <span className="list-search-input-description">{text}...</span>;
    }

    render() {
        const {
            id,
            name,
            type,
            creator,
            description,
            address,
            image
        } = this.props;

        return (
            <div className="listing-item">
                <article className="geodir-category-listing fl-wrap">
                    <div className="geodir-category">
                        <Link to={`/meetup/${id}`}>
                            <img
                                className="item-grid-meetup"
                                src={image}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="geodir-category-content fl-wrap">
                        <div className="listing-avatar">
                            <Link to={`/meetup/${id}`}>
                                <img
                                    className="item-grid-language"
                                    src="images/avatar/1.jpg"
                                    alt=""
                                />
                            </Link>
                            <span className="avatar-tooltip">
                                Added By
                                <strong>{creator}</strong>
                            </span>
                        </div>
                        <h3>
                            <Link to={`/meetup/${id}`}>{name}</Link>
                        </h3>
                        <p>{this.renderDescription(description)}</p>
                    </div>
                </article>
            </div>
        );
    }
}

export default ListSearchInput;
