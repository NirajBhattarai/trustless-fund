import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import Index from './pages/Index';
import Fund from './pages/Fund';
import Factory from './pages/Factory';

import './layout/config/_base.sass';

class App extends Component {
  render() {
    return (
      <Router basename="/">
        <Route 
          exact path="/" 
          component={Index}
        />
        <Route path="/factory">
          <Redirect to="/v2/factory" />
        </Route>
        <Route 
          path="/:version/factory" 
          component={Factory}
        />
        <Route 
          path="/:version/fund/:fundId" 
          component={Fund}
        />
      </Router>
    );
  }
}

export default App;
