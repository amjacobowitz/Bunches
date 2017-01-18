import { createReducer } from 'redux-create-reducer';
import {
  ADD_SUBMISSION,
  REMOVE_SUBMISSION,
} from '../actions/index';

const initialState = {};

const handlers = {
  [ADD_SUBMISSION]: (state, { submission }) => {
    return { ...state, [submission.id]: { ...submission } };
  },
  [REMOVE_SUBMISSION]: (state, { submissionId }) => {
    delete state[submissionId];
    return state;
  },
}

export default createReducer(initialState, handlers);
