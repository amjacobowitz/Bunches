import { createReducer } from 'redux-create-reducer';
import {
  ADD_SUBMISSION,
  ADD_SUBMISSIONS,
  EDIT_SUBMISSION,
  REMOVE_SUBMISSION,
} from '../actions/index';

const initialState = {};

const formatToObjs = (records) => {
  if (records) {
    const results = records.reduce((result, r) => {
       result[r.id] = {
         id: r.id,
         submitted: r.submitted,
         completed: r.completed,
         score: r.score,
         answer: r.answer,
         rating: r.rating,
         review: r.review,
         assignmentId: r.assignment_id,
         studentId: r.student_id,
         dayId: r.day_id,
       };
       return result;
    }, {});
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_SUBMISSIONS]: (state, { submissions }) => {
    return formatToObjs(submissions);
  },

  [ADD_SUBMISSION]: (state, { submission }) => {
    return { ...state, [submission.id]: { ...submission } };
  },
  [EDIT_SUBMISSION]: (state, { submissionId, raw, score }) => {
    const submission = state[submissionId];
    return { ...state, [submissionId]: { ...submission, answer: raw, score } };
  },
  [REMOVE_SUBMISSION]: (state, { submissionId }) => {
    delete state[submissionId];
    return { ...state };
  },
}

export default createReducer(initialState, handlers);
