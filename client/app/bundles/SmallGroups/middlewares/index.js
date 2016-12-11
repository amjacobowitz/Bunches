import logger from './logger';
import thunk from 'redux-thunk';

const middlewares = [thunk];

middlewares.push(logger());

export default middlewares;

