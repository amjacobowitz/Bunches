import { createReducer } from 'redux-create-reducer';
import {
  AUTH_STUDENT,
  AUTH_STUDENT_FAILURE
} from '../actions/index';

const initialState = {
  name: '',
  pin: '',
  error: '',
}

const handlers = {
  [AUTH_STUDENT]: (state, { stu, pin }) => ({
    ...state,
    id: stu.id,
    name: stu.name,
    pin: pin
  }),
  [AUTH_STUDENT_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
};

export default createReducer(initialState, handlers);
