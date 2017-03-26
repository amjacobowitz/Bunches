import {
  EDIT_SUBMISSION,
} from './index';

import { putSubmission } from '../api';

import changePath from './change-path';

export default function editSubmission(submissionId, raw, score) {
  return (dispatch, getState) => {
    return putSubmission(submissionId, raw, score)
    .then((submission) => {
      dispatch({ type: EDIT_SUBMISSION, submissionId, raw, score });
    }).catch((e) => {
      console.warn(e);
    })
  }
}
