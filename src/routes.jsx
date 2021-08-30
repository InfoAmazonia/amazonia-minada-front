import React from 'react';
import {
  BrowserRouter, Redirect, Switch, Route,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

/**
 * Does the platform routing.
 */
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/map"
          component={Dashboard}
        />
        <Redirect from="*" to="/map" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
