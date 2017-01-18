import {
  REMOVE_STUDENT,
  REMOVE_STUDENT_FAILURE
} from './index';

import { destroyStudent } from '../api';

export default function removeStudent(student) {
  return (dispatch) => {
    return destroyStudent(student)
    .then((stu) => {
      dispatch({ type: REMOVE_STUDENT, student });
    }).catch((err) => {
      console.warn(err)
      dispatch({ type: REMOVE_STUDENT_FAILURE })
      throw err;
    })
  }
}
