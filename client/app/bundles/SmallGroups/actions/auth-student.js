import {
  AUTH_STUDENT,
  AUTH_STUDENT_FAILURE,
  FETCH_STUDENT,
  FETCH_STUDENT_FAILURE
} from './index';

import { authorizeStudent, getStudent } from '../api';
import changePath from './change-path';

export default function authStudent(student) {
  return (dispatch) => {
    return authorizeStudent(student)
    .then((stu) => {
      dispatch({ type: AUTH_STUDENT, pin: student.pin, stu });
      return getStudent(stu.id);
    }).then((s) => {
      dispatch({ type: FETCH_STUDENT, s });
      changePath('student/assignment');
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: AUTH_STUDENT_FAILURE })
    });
  };
}
