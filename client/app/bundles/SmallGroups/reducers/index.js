import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import assignment from './assignment';
import assignments from './assignments';
import current_student from './current-student';
import current_teacher from './current-teacher';
import goals from './goals';
import groups from './groups';
import groupings from './groupings';
import klasses from './klasses';
import lessons from './lessons';
import review from './review';
import student from './student';
import students from './students';

export default combineReducers({
  assignment,
  assignments,
  current_student,
  current_teacher,
  goals,
  groups,
  groupings,
  klasses,
  lessons,
  review,
  routing,
  student,
  students,
})
