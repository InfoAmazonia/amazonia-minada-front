import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Route } from "react-router-dom";
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
