import {
  AUTH_STUDENT,
  AUTH_STUDENT_FAILURE,
} from './index';

import { authorizeStudent } from '../api';
import changePath from './change-path';

export default function authStudent(student) {
  return (dispatch, getState) => {
    return authorizeStudent(student)
    .then((stu) => {
      dispatch({ type: AUTH_STUDENT, pin: student.pin, stu });
    }).then(() => {
      const { current_student: { id } } = getState();
      changePath(`student/${id}/assignment`);
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: AUTH_STUDENT_FAILURE })
      throw err;
    });
  };
}
