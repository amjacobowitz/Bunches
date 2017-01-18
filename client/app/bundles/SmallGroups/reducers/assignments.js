import { createReducer } from 'redux-create-reducer';
import {
  ADD_ASSIGNMENT,
  ADD_ASSIGNMENTS,
  REMOVE_ASSIGNMENT,
  CHANGE_DIRECTIONS,
  CHANGE_TITLE,
} from '../actions/index';

const initialState = {};

const formatToObjs = (records) => {
  if (records) {
    const results = records.map((r) => {
      return { [r.id]: { ...r } };
    });
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_ASSIGNMENT]: (state, { assignment }) => {
    return { ...state, [assignment.id]: { ...assignment } };
  },
  [ADD_ASSIGNMENTS]: (state, { assignments }) => {
    return formatToObjs(assignments);
  },
  [REMOVE_ASSIGNMENT]: (state, { assignmentId }) => {
    delete state[assignmentId];
    return state;
  },
  [CHANGE_DIRECTIONS]: (state, { assignmentId, directions }) => {
    const assignment = state[assignmentId];
    return { ...state, [assignmentId]: { ...assignment, direction: directions } };
  },
  [CHANGE_TITLE]: (state, { title }) => {
    const assignment = state[assignmentId];
    return { ...state, [assignmentId]: { ...assignment, title: title } };
  },
}

export default createReducer(initialState, handlers);
