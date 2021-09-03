import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

/**
 * It does the platform routing.
 */
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
