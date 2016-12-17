import { createReducer } from 'redux-create-reducer';
import {
  FETCH_STUDENT,
  FETCH_STUDENT_FAILURE
} from '../actions/index';

const initialState = {

};

const handlers = {
  [FETCH_STUDENT]: (state, { s }) => ({
    ...state,
    id: s.id,
    name: s.name,
    klass: {
      name: s.klasses[0].name,
      id: s.klasses[0].id
    },
    group: {
      id: s.group.id
    },
    goals: s.goals,
  }),
  [FETCH_STUDENT_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
}

export default createReducer(initialState, handlers);
