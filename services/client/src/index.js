import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./register-service-worker";

import App from "./App";
import store from "./store";

import "font-awesome/css/font-awesome.min.css";
import "stylesheets/reset.css";
import "stylesheets/plugins.css";
import "stylesheets/style.css";
import "stylesheets/color.css";

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

registerServiceWorker();
