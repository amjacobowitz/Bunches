import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import StudentOverview from './routes/student-overview/index';
import Layout from './routes/layout/index';

export default class SmallGroups extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ browserHistory }>
        <Route component={ Layout }>
          <Route path="/student" component={ StudentOverview } />
        </Route>
      </Router>
    )
  }
}

