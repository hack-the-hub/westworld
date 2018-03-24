import React, { Component } from "react";

class PromoVideo extends Component {
    render() {
        return (
            <div className="list-single-main-item fl-wrap" id="sec3">
                <div className="list-single-main-item-title fl-wrap">
                    <h3>Promo Video</h3>
                </div>
                <div className="iframe-holder fl-wrap">
                    <div className="resp-video">
                        <iframe
                            id="promo-video"
                            src="https://player.vimeo.com/video/161566855"
                            width="640"
                            height="360"
                            frameborder="0"
                            webkitallowfullscreen="webkitallowfullscreen"
                            mozallowfullscreen="mozallowfullscreen"
                            allowfullscreen="allowfullscreen"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PromoVideo;
