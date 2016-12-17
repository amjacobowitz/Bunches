import {
  FETCH_TEACHER,
  FETCH_TEACHER_FAILURE
} from './index';

import { getTeacher } from '../api';
import changePath from './change-path';

export default function fetchTeacher(teacher) {
  return (dispatch) => {
    return getTeacher(teacher).then((t) => {
      dispatch({ type: FETCH_TEACHER, t });
      changePath('teacher/dashboard');
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: FETCH_TEACHER_FAILURE });
    });
  };
}
