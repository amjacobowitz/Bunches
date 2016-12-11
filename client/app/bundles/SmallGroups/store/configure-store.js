import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers/index';
import middlewares from '../middlewares';

export default function configureStore(initialState, debug) {
  const middleware = applyMiddleware(...middlewares);
  const composedMiddleware = compose(middleware);

  const store = createStore(reducers, initialState, composedMiddleware);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
