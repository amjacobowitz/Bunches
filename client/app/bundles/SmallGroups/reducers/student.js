import { createReducer } from 'redux-create-reducer';
import {
  FETCH_STUDENT,
  FETCH_STUDENT_FAILURE
} from '../actions/index';

const initialState = {
  id: '',
  firstName: '',
  goal: {},
  group: {},
  klass: {},
  lastName: '',
};

const handlers = {
  [FETCH_STUDENT]: (state, { student }) => {
    return {
      ...state,
      id: student.id,
      firstName: student.first_name,
      lastName: student.last_name,
      klass: {
        name: student.klass.name,
        id: student.klass.id
      },
      goal: student.goal,
    }
  },
  [FETCH_STUDENT_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
}

export default createReducer(initialState, handlers);
