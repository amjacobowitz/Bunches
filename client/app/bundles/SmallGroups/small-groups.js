import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configure-store';
import routes from './routes/index';

const __DEBUG__ = true;

const store = configureStore({}, __DEBUG__);

const history = syncHistoryWithStore(browserHistory, store);

export default class SmallGroups extends Component {
  renderDevTools() {
    return <DevTools/>;
  }

  render() {
    return (
      <Provider store={ store } >
        <div>
          <Router history={ history }>
            { routes(store) }
          </Router>
        </div>
      </Provider>
    );
  }
}

