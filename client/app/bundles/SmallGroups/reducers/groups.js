import { createReducer } from 'redux-create-reducer';
import {
  ADD_GROUP,
  ADD_GROUPS,
  REMOVE_GROUP,
  ADD_STUDENT_TO_GROUP,
  REMOVE_STUDENT_FROM_GROUP,
  ADD_GROUPING_TO_GROUP,
  REMOVE_GROUPING_FROM_GROUP,
  ADD_GOAL_TO_GROUP,
  REMOVE_GOAL_FROM_GROUP,
  UPDATE_GROUP_NAME,
  ADD_ASSIGNMENT_TO_GROUP,
  REMOVE_ASSIGNMENT_FROM_GROUP
} from '../actions/index';

const initialState = {};

const removeStudent = (studentId, students) => {
  const index = students.indexOf(studentId);
  const before = students.slice(0, index);
  const after = students.slice(index + 1, students.length);
  return before.concat(after);
};

const formatToObjs = (state, records) => {
  if (records) {
    const results = records.reduce((result, r) => {
      result[r.id] = {
        id: r.id,
        name: r.name,
        groupingId: r.grouping_id,
        assignmentId: r.assignment_id,
        goalId: r.goal_id,
        students: r.students.map((s) => {
          return s.id;
        }),
      };
      return result;
    }, state);
    return  results;
  } else {
    return {};
  }
}

const handlers = {
  [ADD_GROUP]: (state, { group }) => {
    return { ...state, [group.id]:
      {
        id: group.id,
        name: '',
        groupingId: group.grouping_id,
        assignmentId: '',
        goalId: '',
        students: [],
      }
    };
  },
  [ADD_GROUPS]: (state, { groups }) => {
    return { ...formatToObjs(state, groups) }
  },
  [ADD_ASSIGNMENT_TO_GROUP]: (state, { groupId, assignmentId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, assignmentId: assignmentId } };
  },
  [UPDATE_GROUP_NAME]: (state, { group }) => {
  const oldGroup = state[group.id];
  return { ...state, [group.id]: { ...oldGroup, name: group.name } };
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
    return { ...state, [groupId]: { ...group, students } };
  },
  [ADD_GROUPING_TO_GROUP]: (state, { groupingId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, groupingId } };
  },
  [REMOVE_GROUPING_FROM_GROUP]: (state, { groupingId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, groupingId } };
  },
  [ADD_GOAL_TO_GROUP]: (state, { goalId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, goalId } };
  },
  [REMOVE_GOAL_FROM_GROUP]: (state, { goalId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, goalId: '' } };
  },
  [REMOVE_ASSIGNMENT_FROM_GROUP]: (state, { assigmentId, groupId }) => {
    const group = state[groupId];
    return { ...state, [groupId]: { ...group, assignmentId: '' } };
  }
}

export default createReducer(initialState, handlers);
