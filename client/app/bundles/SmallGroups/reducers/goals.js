import { createReducer } from 'redux-create-reducer';
import {
  ADD_GOAL,
  ADD_STUDENT_TO_GOAL,
  ADD_GROUP_TO_GOAL,
  REMOVE_STUDENT_FROM_GOAL,
  REMOVE_GROUP_FROM_GOAL,
  ADD_GOALS,
  REMOVE_GOAL,
  UPDATE_GOAL_DESCRIPTION,
} from '../actions/index';

const initialState = {};

const formatToObjs = (records) => {
  if (records) {
    const results = records.reduce((result, r) => {
      result[r.id] = {
        id: r.id,
        description: r.description,
        students: r.students.map((s) => {
          return s.id;
        }),
        groups: r.groups.map((g) => {
          return g.id;
        }),
      };
      return result;
    }, {});
    return { ...results };
  } else {
    return {};
  }
}

const removeAssociation = (associationId, associations) => {
  const index = associations.indexOf(associationId);
  const before = associations.slice(0, index);
  const after = associations.slice(index + 1, associations.length);
  return before.concat(after);
}

const handlers = {
  [ADD_GOAL]: (state, { goal }) => {
    return { ...state, [goal.id]:
      {
        id: goal.id,
        description: goal.description,
        students: goal.students.map((s) => {
          return s.id;
        }),
        groups: goal.groups.map((g) => {
          return g.id;
        }),
      }
    };
  },
  [UPDATE_GOAL_DESCRIPTION]: (state, { goal }) => {
    const oldGoal = state[goal.id];
    return { ...state, [goal.id]: { ...oldGoal, description: goal.description } }
  },
  [ADD_GOALS]: (state, { goals }) => {
    return { ...formatToObjs(goals) };
  },
  [ADD_GROUP_TO_GOAL]: (state, { goalId, groupId }) => {
    const goal = state[goalId];
    const groups = goal.groups;
    return { ...state, [goalId]: { ...goal, groups: groups.concat(groupId) } };
  },
  [REMOVE_GROUP_FROM_GOAL]: (state, { goalId, groupId } ) => {
    const goal = state[goalId];
    const groups = removeAssociation(groupId, goal.groups);
    return { ...state, [goalId]: { ...goal, groups: groups } };
  },
  [ADD_STUDENT_TO_GOAL]: (state, { goalId, studentId }) => {
    const goal = state[goalId];
    const students = goal.students;
    return { ...state, [goalId]: { ...goal, students: students.concat(studentId) } };
  },
  [REMOVE_STUDENT_FROM_GOAL]: (state, { goalId, studentId }) => {
    const goal = state[goalId];
    const students = removeAssociation(studentId, goal.students);
    return { ...state, [goalId]: { ...goal, students: students } };
  },
  [REMOVE_GOAL]: (state, { goalId }) => {
    delete state[goalId];
    return { ...state };
  },
}

export default createReducer(initialState, handlers);
