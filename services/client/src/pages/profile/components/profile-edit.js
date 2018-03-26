import React, { Component } from "react";

class ProfileEdit extends Component {
    render() {
        return (
            <div>
                <div className="profile-edit-container">
                    <div className="profile-edit-header fl-wrap">
                        <h4>My Account</h4>
                    </div>
                    <div className="custom-form">
                        <label>
                            Your Name
                            <i className="fa fa-user-o" />
                        </label>
                        <input
                            type="text"
                            placeholder="Kyle Harrison"
                            value=""
                        />
                        <label>
                            Email Address<i className="fa fa-envelope-o" />
                        </label>
                        <input
                            type="text"
                            placeholder="kyle90adam@hotmail.com"
                            value=""
                        />
                        <label>
                            Phone<i className="fa fa-phone" />
                        </label>
                        <input
                            type="text"
                            placeholder="+7(123)987654"
                            value=""
                        />
                        <label>
                            Adress
                            <i className="fa fa-map-marker" />
                        </label>
                        <input
                            type="text"
                            placeholder="USA 27TH Brooklyn NY"
                            value=""
                        />
                        <label>
                            Website
                            <i className="fa fa-globe" />
                        </label>
                        <input
                            type="text"
                            placeholder="themeforest.net"
                            value=""
                        />
                        <label>Notes</label>
                        <textarea cols="40" rows="3" placeholder="About Me" />
                    </div>
                </div>

                <div className="profile-edit-container">
                    <div
                        className="profile-edit-header fl-wrap"
                        style={{
                            marginTop: "30px;"
                        }}
                    >
                        <h4>My Socials</h4>
                    </div>
                    <div className="custom-form">
                        <label>
                            Facebook
                            <i className="fa fa-facebook" />
                        </label>
                        <input
                            type="text"
                            placeholder="https://www.facebook.com/"
                            value=""
                        />
                        <label>
                            Twitter<i className="fa fa-twitter" />
                        </label>
                        <input
                            type="text"
                            placeholder="https://twitter.com/"
                            value=""
                        />
                        <label>
                            Vkontakte<i className="fa fa-vk" />
                        </label>
                        <input type="text" placeholder="vk.com" value="" />
                        <label>
                            Whatsapp
                            <i className="fa fa-whatsapp" />
                        </label>
                        <input
                            type="text"
                            placeholder="https://www.whatsapp.com"
                            value=""
                        />
                        <button className="btn  big-btn  color-bg flat-btn">
                            Save Changes<i className="fa fa-angle-right" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEdit;
