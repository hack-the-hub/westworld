import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Events from "./pages/Events";
import Projects from "./pages/Projects";
import Latest from "./pages/Latest";
import Speakers from "./pages/Speakers";
import Developers from "./pages/Developers";

import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="event" className="container mx-auto shadow-lg lg:max-w-md">
          <Header />
          <Switch>
            <Route exact path="/" render={props => <Latest {...props} />} />
            <Route
              exact
              path="/latest"
              render={props => <Latest {...props} />}
            />
            <Route
              exact
              path="/event"
              render={props => <Events {...props} />}
            />
            <Route
              exact
              path="/project"
              render={props => <Projects {...props} />}
            />
            <Route
              exact
              path="/speaker"
              render={props => <Speakers {...props} />}
            />
            <Route
              exact
              path="/developer"
              render={props => <Developers {...props} />}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
