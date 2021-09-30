import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

function FilteringRoute({ path, ...rest }) {
  FilteringRoute.propTypes = {
    path: PropTypes.string.isRequired,
  };

  const { search } = rest.location;

  if (search === '') {
    return <Redirect from="*" to="/" />;
  }

  return <Route path={path} {...rest} />;
}

/**
 * It does the platform routing.
 */
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <FilteringRoute exact path="/filter" component={Dashboard} />
        <FilteringRoute exact path="/embed" component={Dashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
