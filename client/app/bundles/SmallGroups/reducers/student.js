import { createReducer } from 'redux-create-reducer';
import {
  FETCH_STUDENT,
  FETCH_STUDENT_FAILURE
} from '../actions/index';

const initialState = {
  id: '',
  firstName: '',
  goals: [],
  group: {},
  klass: {},
  lastName: '',
};

const handlers = {
  [FETCH_STUDENT]: (state, { student }) => ({
    ...state,
    id: student.id,
    firstName: student.first_name,
    lastName: student.last_name,
    klass: {
      name: student.klass.name,
      id: student.klass.id
    },
    group: {
      id: student.group.id
    },
    goals: student.goals,
  }),
  [FETCH_STUDENT_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
}

export default createReducer(initialState, handlers);
