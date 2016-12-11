import {
  FETCH_STUDENT,
  FETCH_STUDENT_FAILURE
} from './index';

import { getStudent } from '../api';
import changePath from './change-path';

export default function fetchStudent(student) {
  return (dispatch) => {
    return getStudent(student).then((student) => {
      dispatch({ type: FETCH_STUDENT, student })
      changePath('student/assignment');
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: FETCH_STUDENT_FAILURE })
    });
  };
}
