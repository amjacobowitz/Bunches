import { createReducer } from 'redux-create-reducer';
import {
  AUTH_TEACHER,
  AUTH_TEACHER_FAILURE
} from '../actions/index';

const initialState = {
  id: '',
  name: '',
};

const handlers = {
  [AUTH_TEACHER]: (state, { teacher }) => ({
    ...state,
    id: teacher.id,
    name: teacher.name,
  }),
  [AUTH_TEACHER_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
}

export default createReducer(initialState, handlers);
