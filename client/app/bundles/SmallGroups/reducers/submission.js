import { createReducer } from 'redux-create-reducer';
import {
  ADD_REVIEW,
  COMPLETE_SUBMISSION,
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
    completed: true,
    answer: submission.answer
  }),
  [SUBMIT_SUBMISSION]: (state, { submission }) => ({ ...state, submitted: true, id: submission.id  }),
}

export default createReducer(initialState, handlers);
