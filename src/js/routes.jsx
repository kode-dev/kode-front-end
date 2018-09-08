import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Submission from './views/submission';
import Owner from './views/owner'
import PageNotFound from 'commonComponents/PageNotFound'
import Landing from 'components/landing'
import Pricing from 'components/landing/Pricing'

import '../style/index.css'

// NOTE: order matters for these routes. If you have a more generic route above a specific one, the generic
// route will intercept specific route requests. (e.g. /pricing has to come before /).

module.exports = (
  <div className="container">
      <Switch>
        <Route path="/submission/:submissionId/:mode" component={Submission} />
        <Route path="/submission/:submissionId" component={Submission} />
        <Route path="/submission" component={Submission} />

        <Route path="/demo/:submissionId/:mode" component={Submission} />
        <Route path="/demo/:submissionId" component={Submission} />
        <Route path="/demo" component={Submission} />

        <Route path="/dashboard" component={Owner} />
        <Route path="/create-assignment" component={Owner} />
        <Route path="/assignment/:id" component={Owner} />
        <Route path="/assignment-submission/:id" component={Owner} />
        <Route path="/account" component={Owner} />

        <Route path="/pricing" component={Pricing} />

        <Route path="/" component={Landing} />
        
      </Switch>
  </div>
);
