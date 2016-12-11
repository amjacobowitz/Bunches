import { createReducer } from 'redux-create-reducer';
import {
  FETCH_STUDENT,
  FETCH_STUDENT_FAILURE
} from '../actions/index';

const initialState = {
  name: '',
  pin: '',
  error: '',
}

const handlers = {
  [FETCH_STUDENT]: (state, { student }) => ({
    ...state,
    name: student.name,
    pin: student.pin,
  }),
  [FETCH_STUDENT_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
};

export default createReducer(initialState, handlers);
