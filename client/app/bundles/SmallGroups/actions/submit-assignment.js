import {
  SUBMIT_ASSIGNMENT,
  SUBMIT_ASSIGNMENT_FAILURE
} from './index';

import { putAssignment } from '../api';

export default function submitAssignment() {
  return (dispatch, getState) => {
    const { student: { group }, assignment } = getState();
    return putAssignment(group.id, assignment.id)
    .then(() => {
      dispatch({ type: SUBMIT_ASSIGNMENT });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: SUBMIT_ASSIGNMENT_FAILURE });
      throw err;
    })
  }
}
