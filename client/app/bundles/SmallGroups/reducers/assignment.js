import { createReducer } from 'redux-create-reducer';
import {
  FETCH_ASSIGNMENT,
} from '../actions/index';

const initialState = {};

const handlers = {
  [FETCH_ASSIGNMENT]: (state, { assignment }) => ({
    ...state,
    id: assignment.id,
    directions: assignment.directions,
    title: assignment.title,
  }),
}

export default createReducer(initialState, handlers);
