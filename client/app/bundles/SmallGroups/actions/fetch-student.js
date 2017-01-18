import {
  FETCH_STUDENT,
  FETCH_STUDENT_FAILURE
} from './index';

import { getStudent } from '../api';

export default function fetchStudent(studentId) {
  return (dispatch) => {
    return getStudent(studentId)
    .then((student) => {
      dispatch({ type: FETCH_STUDENT, student });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: FETCH_STUDENT_FAILURE })
      throw err;
    });
  };
}

