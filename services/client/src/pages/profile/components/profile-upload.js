import React, { Component } from "react";

class ProfileUpload extends Component {
    render() {
        return (
            <div className="edit-profile-photo fl-wrap">
                <img
                    src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/1455115_10153441244790459_1787397019_n.jpg?oh=bc43967651e9dc8288e9b7666ca88dfe&oe=5B4594E3"
                    className="respimg"
                    alt=""
                />
                <div className="change-photo-btn">
                    <div className="photoUpload">
                        <span>
                            <i className="fa fa-upload" />
                            Upload Photo
                        </span>
                        <input type="file" className="upload" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileUpload;
