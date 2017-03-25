import { EDIT_ASSIGNMENT, EDIT_ASSIGNMENT_FAILURE } from './index';

import { putAssignment } from '../api';

export default function editAssignment(assignment, teacherId, assignmentId) {
  return (dispatch, getState) => {
    const editedAssignment = { ...assignment, id: assignmentId };

    return putAssignment(editedAssignment, teacherId)
    .then((assign) => {
      dispatch({ type: EDIT_ASSIGNMENT, assignment: editedAssignment });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: EDIT_ASSIGNMENT_FAILURE });
      throw err;
    })
  }
}
