import React, { Component } from "react";

class Question extends Component {
    render() {
        return (
            <section className="gradient-bg">
                <div className="cirle-bg">
                    <div className="bg" data-bg="images/bg/circle.png" />
                </div>
                <div className="container">
                    <div className="join-wrap fl-wrap">
                        <div className="row">
                            <div className="col-md-8">
                                <h3>Do You Have Questions ?</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, harum dolor nec
                                    in, usu molestiae at no.
                                </p>
                            </div>
                            <div className="col-md-4">
                                <a
                                    href="contacts.html"
                                    className="join-wrap-btn"
                                >
                                    Get In Touch
                                    <i className="fa fa-envelope-o" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Question;
