import { ADD_ASSIGNMENT, ADD_ASSIGNMENT_FAILURE } from './index';

import { createAssignment } from '../api';

export default function addAssignment(assignment, teacherId) {
  return (dispatch, getState) => {
    return createAssignment(assignment, teacherId)
    .then((assign) => {
      dispatch({ type: ADD_ASSIGNMENT, assignment: assign });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: ADD_ASSIGNMENT_FAILURE });
      throw err;
    })
  }
}
