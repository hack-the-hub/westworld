import React, { Component } from "react";

// propTypes: {
//   label: React.PropTypes.string.isRequired,
//   children: React.PropTypes.element.isRequired
// }

class Pane extends Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}

export default Pane;
