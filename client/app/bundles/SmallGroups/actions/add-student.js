import {
  ADD_STUDENT,
  ADD_STUDENT_FAILURE
} from './index';

import { createStudent } from '../api';

export default function addStudent(stu, teacherId) {
  return (dispatch) => {
    return createStudent(stu, teacherId)
    .then((student) => {
      dispatch({ type: ADD_STUDENT, student });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: ADD_STUDENT_FAILURE });
      throw err;
    })
  }
}
