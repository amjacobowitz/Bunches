import {
  SUBMIT_SUBMISSION,
  SUBMIT_SUBMISSION_FAILURE
} from './index';

import { putSubmission } from '../api';

export default function submitSubmission() {
  return (dispatch, getState) => {
    const { submission: { id } } = getState();

    return putSubmission(id)
    .then((submission) => {
      dispatch({ type: SUBMIT_SUBMISSION, submission });
    }).catch((err) => {
      console.warn(err);
      dispatch({ type: SUBMIT_SUBMISSION_FAILURE });
      throw err;
    })
  }
}
