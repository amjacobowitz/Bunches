import { createReducer } from 'redux-create-reducer';
import {
  ADD_GROUP,
  ADD_GROUPS,
  REMOVE_GROUP,
  ADD_STUDENT_TO_GROUP,
  REMOVE_STUDENT_FROM_GROUP,
  ADD_GROUPING_TO_GROUP,
  REMOVE_GROUPING_FROM_GROUP
} from '../actions/index';

const initialState = {};

const removeStudent = (studentId, students) => {
  const index = students.indexOf(studentId);
  const before = students.slice(0, index);
  const after = students.slice(index + 1, students.length);
  return before.concat(after);
};

const formatToObjs = (records) => {
  if (records) {
    const results = records.map((r) => {
      return {
        [r.id]: {
          id: r.id,
          description: r.description,
          students: []
        }
      };
    });
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_GROUP]: (state, { group }) => {
    return { ...state, [group.id]: { ...group } };
  },
  [ADD_GROUPS]: (state, { groups }) => {
    return formatToObjs(groups);
  },
  [REMOVE_GROUP]: (state, { groupId }) => {
    delete state[groupId];
    return { ...state };
  },
  [ADD_STUDENT_TO_GROUP]: (state, { studentId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, students: group.students.concat(studentId) } };
  },
  [REMOVE_STUDENT_FROM_GROUP]: (state, { studentId, groupId }) => {
    const group = state[groupId];
    const students = removeStudent(studentId, group.students);
    return { ...state, [groupId]: { ...group, students: students } };
  },
  [ADD_GROUPING_TO_GROUP]: (state, { groupingId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, groupingId } };
  },
  [REMOVE_GROUPING_FROM_GROUP]: (state, { groupingId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, groupingId } };
  },
}

export default createReducer(initialState, handlers);
