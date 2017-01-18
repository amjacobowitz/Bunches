import { createReducer } from 'redux-create-reducer';
import {
  COMPLETE_ASSIGNMENT,
  FETCH_ASSIGNMENT,
  SUBMIT_ASSIGNMENT,
} from '../actions/index';

const initialState = {};

const handlers = {
  [FETCH_ASSIGNMENT]: (state, { assignment }) => ({
    ...state,
    id: assignment.id,
    directions: assignment.directions,
    title: assignment.title,
    completed: false,
    submitted: false
  }),
  [COMPLETE_ASSIGNMENT]: (state) => ({
    ...state,
    completed: true,
  }),
  [SUBMIT_ASSIGNMENT]: (state) => ({
    ...state,
    submitted: true,
  }),
}

export default createReducer(initialState, handlers);
