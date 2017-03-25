import { createReducer } from 'redux-create-reducer';
import {
  ADD_ASSIGNMENT,
  ADD_ASSIGNMENTS,
  ADD_GROUP_TO_ASSIGNMENT,
  ADD_LESSON_TO_ASSIGNMENT,
  EDIT_ASSIGNMENT,
  REMOVE_ASSIGNMENT,
  REMOVE_GROUP_FROM_ASSIGNMENT,
  REMOVE_LESSON_FROM_ASSIGNMENT,
  REMOVE_LESSONS_FROM_ASSIGNMENT,
  CHANGE_DIRECTIONS,
  CHANGE_TITLE,
} from '../actions/index';

const initialState = {};

const removeAssociation = (id, records) => {
  const index = records.indexOf(id);
  const before = records.slice(0, index);
  const after = records.slice(index + 1, records.length);
  return before.concat(after);
};

const formatToObjs = (records) => {
  if (records) {
    const results = records.reduce((result, r) => {
       result[r.id] = {
         id: r.id,
         lessons: r.lessons.map((l) => l.id),
         teacherId: r.teacher_id,
         directions: r.directions,
         title: r.title,
         groups: r.groups.map((s) => s.id),
         days: r.days.map((d) => d.id),
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
        lessons: assignment.lessons.map((l) => l.id),
        teacherId: assignment.teacher_id,
        directions: assignment.directions,
        title: assignment.title,
        groups: assignment.groups.map((s) => s.id),
        days: assignment.days.map((d) => d.id),
      }
    };
  },
  [ADD_ASSIGNMENTS]: (state, { assignments }) => {
    return formatToObjs(assignments);
  },
  [EDIT_ASSIGNMENT]: (state, { assignment }) => {
    delete state[assignment.id];
    return { ...state, [assignment.id]: { ...assignment } };
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
    return { ...state, [assignmentId]: { ...assignment, groups: removeAssociation(groupId, assignment.groups) } };
  },
  [ADD_LESSON_TO_ASSIGNMENT]: (state, { lessonId, assignmentId }) => {
    const assignment = state[assignmentId];
    const lessons = assignment.lessons;
    return { ...state, [assignmentId]: { ...assignment, lessons: lessons.concat(lessonId)}}
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
    return { ...state, [assignmentId]: { ...assignment, lessons: removeAssociation(lessonId, assignment.lessons) } };
  },
  [REMOVE_LESSONS_FROM_ASSIGNMENT]: (state, { assignmentId }) => {
    const assignment = state[assignmentId];
    return { ...state, [assignmentId]: { ...assignment, lessons: [] } };
  },
}

export default createReducer(initialState, handlers);
