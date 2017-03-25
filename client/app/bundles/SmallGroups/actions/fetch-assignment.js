import {
  FETCH_ASSIGNMENT,
  FETCH_ASSIGNMENT_FAILURE
} from './index';

import { getAssignment } from '../api';

export default function fetchAssignment(studentId) {
  return (dispatch) => {
    return getAssignment(studentId)
    .then((assignment) => {
      dispatch({ type: FETCH_ASSIGNMENT, assignment });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: FETCH_ASSIGNMENT_FAILURE });
      throw err;
    });
  };
}
