import { createReducer } from 'redux-create-reducer';
import {
  ADD_ASSIGNMENT,
  ADD_ASSIGNMENTS,
  ADD_GROUP_TO_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  REMOVE_GROUP_FROM_ASSIGNMENT,
  REMOVE_LESSON_FROM_ASSIGNMENT,
  CHANGE_DIRECTIONS,
  CHANGE_TITLE,
} from '../actions/index';

const initialState = {};

const removeGroup = (groupId, groups) => {
  const index = groups.indexOf(groupId);
  const before = groups.slice(0, index);
  const after = groups.slice(index + 1, groups.length);
  return before.concat(after);
};

const formatToObjs = (records) => {
  if (records) {
    const results = records.reduce((result, r) => {
       result[r.id] = {
         id: r.id,
         lessonId: r.lesson_id,
         teacherId: r.teacher_id,
         directions: r.directions,
         title: r.title,
         groups: r.groups.map((s) => s.id),
       };
       return result;
    }, {});
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_ASSIGNMENT]: (state, { assignment }) => {
    return { ...state, [assignment.id]: {
        id: assignment.id,
        lessonId: assignment.lesson_id,
        teacherId: assignment.teacher_id,
        directions: assignment.directions,
        title: assignment.title,
        groups: assignment.groups.map((s) => s.id ),
      }
    };
  },
  [ADD_ASSIGNMENTS]: (state, { assignments }) => {
    return formatToObjs(assignments);
  },
  [REMOVE_ASSIGNMENT]: (state, { assignmentId }) => {
    delete state[assignmentId];
    return { ...state };
  },
  [ADD_GROUP_TO_ASSIGNMENT]: (state, { groupId, assignmentId }) => {
    const assignment = state[assignmentId];
    const groups = assignment.groups;
    return { ...state, [assignmentId]: { ...assignment, groups: groups.concat(groupId) } };
  },
  [REMOVE_GROUP_FROM_ASSIGNMENT]: (state, { assignmentId, groupId }) => {
    const assignment = state[assignmentId];
    return { ...state, [assignmentId]: { ...assignment, groups: removeGroup(groupId, assignment.groups) } };
  },
  [CHANGE_DIRECTIONS]: (state, { assignmentId, directions }) => {
    const assignment = state[assignmentId];
    return { ...state, [assignmentId]: { ...assignment, direction: directions } };
  },
  [CHANGE_TITLE]: (state, { assignmentId, title }) => {
    const assignment = state[assignmentId];
    return { ...state, [assignmentId]: { ...assignment, title: title } };
  },
  [REMOVE_LESSON_FROM_ASSIGNMENT]: (state, { assignmentId, lessonId }) => {
    const assignment = state[assignmentId];
    return { ...state, [assignmentId]: { ...assignment, lessonId: '' } };
  }
}

export default createReducer(initialState, handlers);
