import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { Provider } from "react-redux";
import App from "./App";

import configureStore from "./store";

const store = configureStore();

const googleAnalyticId = `${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`;

ReactGA.initialize(googleAnalyticId);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
