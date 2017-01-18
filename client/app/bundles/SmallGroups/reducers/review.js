import { createReducer } from 'redux-create-reducer';
import {
  CHANGE_REVIEW,
} from '../actions/index';

const initialState = {
  body: '',
};

const handlers = {
  [CHANGE_REVIEW]: (state, { body } ) => ({
    ...state,
    body,
  }),
}

export default createReducer(initialState, handlers);
