import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import student from './student';

export default combineReducers({
  student,
  routing,
})
