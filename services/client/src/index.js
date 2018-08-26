import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import App from "./App";

const googleAnalyticId = `${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`;

ReactGA.initialize(googleAnalyticId);

ReactDOM.render(<App />, document.getElementById("root"));
