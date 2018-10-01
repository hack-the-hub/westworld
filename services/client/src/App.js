import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Events from "./pages/events";
import Videos from "./pages/videos";
import Speakers from "./pages/speakers";
import Header from "./components/header";
import Footer from "./components/footer";
import withTracker from "./withTracker";

const App = () => (
  <Router>
    <div className="container">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          background-color: #f9f9f7;
        }
      `}</style>
      <style jsx>{`
        .container {
          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
            0 5px 15px 0 rgba(0, 0, 0, 0.08);
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 0;
          padding-bottom: 0;
          width: 100%;
          
        }

        @media (min-width: 576px) {
          .container {
            max-width: 576px;
          }
        }

        @media (min-width: 768px) {
          .container {
            max-width: 768px;
          }
        }

        @media (min-width: 992px) {
          .container {
            max-width: 47rem;
            auto;
          }
        }
      `}</style>
      <Header />
      <Switch>
        <Route exact path="/" component={withTracker(Events)} />
        <Route exact path="/event" component={withTracker(Events)} />
        <Route exact path="/video" component={withTracker(Videos)} />
        <Route exact path="/speaker" component={withTracker(Speakers)} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
