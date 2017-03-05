import { createReducer } from 'redux-create-reducer';
import camelCase from 'camelcase';

import {
  ADD_STUDENT,
  ADD_STUDENTS,
  REMOVE_STUDENT,
  ADD_GROUP_TO_STUDENT,
  REMOVE_GROUP_FROM_STUDENT,
  ADD_GOAL_TO_STUDENT,
  REMOVE_GOAL_FROM_STUDENT,
} from '../actions/index';

const initialState = {};

const removeAssociation = (associationId, associations) => {
  const index = associations.indexOf(associationId);
  const before = associations.slice(0, index);
  const after = associations.slice(index + 1, associations.length);
  return before.concat(after);
};

const formatToObjs = (records) => {
  const results = records.reduce((result, r) => {
    result[r.id] = {
      id: r.id,
      firstName: r.first_name,
      lastName: r.last_name,
      groupId: r.group_id,
      klassId: r.klass_id,
      goalId: r.goal_id,
    }
    return result;
  }, {});
  return { ...results };
};

const handlers = {
  [ADD_STUDENT]: (state, { student }) => {
    return { ...state, [student.id]: {
        firstName: camelCase(student.first_name),
        lastName: camelCase(student.last_name),
        id: student.id,
        goalId: student.goal_id
      }
    };
  },
  [ADD_STUDENTS]: (state, { students }) => {
    return { ...formatToObjs(students) };
  },
  [REMOVE_STUDENT]: (state, { studentId }) => {
    delete state[studentId];
    return { ...state };
  },
  [ADD_GROUP_TO_STUDENT]: (state, { studentId, groupId}) => {
    const student = state[studentId];
    return { ...state, [studentId]: { ...student, groupId } };
  },
  [REMOVE_GROUP_FROM_STUDENT]: (state, { studentId, groupId }) => {
    const student = state[studentId];
    return { ...state, [studentId]: { ...student, groupId } };
  },
  [ADD_GOAL_TO_STUDENT]: (state, { goalId, studentId }) => {
    const student = state[studentId];
    return { ...state, [studentId]: { ...student, goalId } };
  },
  [REMOVE_GOAL_FROM_STUDENT]: (state, { goalId, studentId }) => {
    const student = state[studentId];
    return { ...state, [studentId]: { ...student, goalId } };
  },
}

export default createReducer(initialState, handlers);
