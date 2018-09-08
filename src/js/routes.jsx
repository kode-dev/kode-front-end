import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Landing from 'components/landing'
import Report from 'components/report'

import '../style/index.css'

// NOTE: order matters for these routes. If you have a more generic route above a specific one, the generic
// route will intercept specific route requests. (e.g. /pricing has to come before /).

module.exports = (
  <div className="container">
      <Switch>
        <Route path="/" component={Report} />
      </Switch>
  </div>
);
