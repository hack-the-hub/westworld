import React, { Component } from "react";

class Details extends Component {
    render() {
        return (
            <div className="accordion">
                <a className="toggle act-accordion" href="#">
                    Details option
                    <i className="fa fa-angle-down" />
                </a>
                <div className="accordion-inner visible">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas in pulvinar neque. Nulla finibus lobortis
                        pulvinar. Donec a consectetur nulla. Nulla posuere
                        sapien vitae lectus suscipit, et pulvinar nisi
                        tincidunt. Aliquam erat volutpat. Curabitur convallis
                        fringilla diam sed aliquam. Sed tempor iaculis massa
                        faucibus feugiat. In fermentum facilisis massa, a
                        consequat purus viverra.
                    </p>
                </div>
                <a className="toggle" href="#">
                    Details option 2
                    <i className="fa fa-angle-down" />
                </a>
                <div className="accordion-inner">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas in pulvinar neque. Nulla finibus lobortis
                        pulvinar. Donec a consectetur nulla. Nulla posuere
                        sapien vitae lectus suscipit, et pulvinar nisi
                        tincidunt. Aliquam erat volutpat. Curabitur convallis
                        fringilla diam sed aliquam. Sed tempor iaculis massa
                        faucibus feugiat. In fermentum facilisis massa, a
                        consequat purus viverra.
                    </p>
                </div>
                <a className="toggle" href="#">
                    Details option 3
                    <i className="fa fa-angle-down" />
                </a>
                <div className="accordion-inner">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas in pulvinar neque. Nulla finibus lobortis
                        pulvinar. Donec a consectetur nulla. Nulla posuere
                        sapien vitae lectus suscipit, et pulvinar nisi
                        tincidunt. Aliquam erat volutpat. Curabitur convallis
                        fringilla diam sed aliquam. Sed tempor iaculis massa
                        faucibus feugiat. In fermentum facilisis massa, a
                        consequat purus viverra.
                    </p>
                </div>
            </div>
        );
    }
}

export default Details;
