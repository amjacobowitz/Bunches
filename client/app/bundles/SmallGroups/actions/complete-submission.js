import {
  COMPLETE_SUBMISSION,
} from './index';

import { createSubmission } from '../api';

import changePath from './change-path';

export default function completeSubmission(raw) {
  return (dispatch, getState) => {
    const { student, assignment } = getState();

    return createSubmission(student.id, assignment.id, raw)
    .then((submission) => {
      dispatch({ type: COMPLETE_SUBMISSION, submission });
      dispatch(changePath(`/student/${student.id}/review`));
    }).catch((e) => {
      console.warn(e);
    })
  }
}
