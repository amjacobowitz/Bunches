import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import current_student from './current-student';
import current_teacher from './current-teacher';
import student from './student';

export default combineReducers({
  current_student,
  current_teacher,
  student,
  routing,
})
