import { createReducer } from 'redux-create-reducer';
import {
  ADD_REVIEW,
  COMPLETE_SUBMISSION,
  CHANGE_REVIEW,
  CHANGE_RATING,
  FETCH_SUBMISSION,
  SUBMIT_SUBMISSION,
} from '../actions/index';

const initialState = {
  id: '',
  review: '',
  answer: '',
  score: null,
  completed: false,
  submitted: false
};

const handlers = {
  [ADD_REVIEW]: (state, { review }) => ({ ...state, review }),
  [COMPLETE_SUBMISSION]: (state, { submission }) => ({
    ...state,
    id: submission.id,
    review: submission.review,
    score: submission.score,
    submitted: submission.submitted,
    completed: submission.completed,
    answer: submission.answer,
    assignmentId: submission.assignment.id,
  }),
  [CHANGE_REVIEW]: (state, { review }) =>  ({
    ...state, review
  }),
  [CHANGE_RATING]: (state, { rating }) =>  ({
    ...state, rating
  }),

  [SUBMIT_SUBMISSION]: (state, { submission }) => ({ ...state, submitted: true, id: submission.id  }),
}

export default createReducer(initialState, handlers);
