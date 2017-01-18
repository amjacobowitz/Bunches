import { createReducer } from 'redux-create-reducer';
import {
  FETCH_TEACHER,
  FETCH_TEACHER_FAILURE
} from '../actions/index';

const initialState = {
  id: '',
  name: '',
};

const handlers = {
  [FETCH_TEACHER]: (state, { teacher }) => ({
    ...state,
    id: teacher.id,
    name: teacher.name,
  }),
  [FETCH_TEACHER_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
}

export default createReducer(initialState, handlers);
