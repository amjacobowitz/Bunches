import { createReducer } from 'redux-create-reducer';
import {
  ADD_GROUPING,
  ADD_GROUPINGS,
  REMOVE_GROUPING,
  ADD_GROUP_TO_GROUPING,
  REMOVE_GROUP_FROM_GROUPING,
} from '../actions/index';

const initialState = {};

const removeGroup = (groupId, groupings) => {
  const index = groupings.indexOf(groupId);
  const before = groupings.slice(0, index);
  const after = groupings.slice(index + 1, groupings.length);
  return before.concat(after);
}

const formatToObjs = (records) => {
  if (records) {
    const results = records.reduce((result, r) => {
      result[r.id] = {
        id: r.id,
        title: r.title,
        lessonId: r.lesson_id,
        klassId: r.klass_id
      };
      return result;
    }, {});
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_GROUPING]: (state, { grouping }) => {
    return { ...state, [grouping.id]: { ...grouping } };
  },
  [ADD_GROUPINGS]: (state, { groupings }) => {
    return formatToObjs(groupings);
  },
  [REMOVE_GROUPING]: (state, { groupingId }) => {
    delete state[groupingId];
    return state;
  },
  [ADD_GROUP_TO_GROUPING]: (state, { groupId, groupingId }) => {
    const grouping = state[groupingId];
    const groups = grouping.groups;
    return { ...state, [groupingId]: { ...grouping, groups: groups.concat(groupId) } };
  },
  [REMOVE_GROUP_FROM_GROUPING]: (state, { groupId, groupingId }) => {
    const grouping = state[groupingId];
    const students = removeStudent(groupId, grouping.groups);
    return { ...state, [groupingId]: { ...grouping, groups: groups } };
  },
}

export default createReducer(initialState, handlers);
