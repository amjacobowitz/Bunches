import { createReducer } from 'redux-create-reducer';
import {
  ADD_GOAL,
  ADD_GOALS,
  REMOVE_GOAL,
} from '../actions/index';

const initialState = {};

const formatToObjs = (records) => {
  if (records) {
    const results = records.reduce((result, r) => {
      result[r.id] = {
        id: r.id,
        description: r.description,
        studentId: r.student_id
      };
      return result;
    }, {});
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_GOAL]: (state, { goal }) => {
    return { ...state, [goal.id]: { ...goal } };
  },
  [ADD_GOALS]: (state, { goals }) => {
    return formatToObjs(goals);
  },
  [REMOVE_GOAL]: (state, { goalId }) => {
    delete state[goalId];
    return { ...state };
  },
}

export default createReducer(initialState, handlers);
