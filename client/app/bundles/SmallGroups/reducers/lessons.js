import { createReducer } from 'redux-create-reducer';
import {
  ADD_LESSON,
  ADD_LESSONS,
  REMOVE_LESSON,
  ADD_ASSIGNMENT_TO_LESSON,
  REMOVE_ASSIGNMENT_FROM_LESSON,
  ADD_GROUPING_TO_LESSON,
  REMOVE_GROUPING_FROM_LESSON,
} from '../actions/index';

const initialState = {};

const removeAssignment = (assignmentId, assignments) => {
  const index = assignments.indexOf(assignmentId);
  const before = assignments.slice(0, index);
  const after = assignments.slice(index + 1, assignments.length);
  return before.concat(after);
};

const formatToObjs = (records) => {
  if (records) {
    const results = records.reducer((result, r) => {
       result[r.id] = {
         ...r
       };
       return result;
    }, {});
    return { ...results };
  } else {
    return {};
  }
}

const handlers = {
  [ADD_LESSON]: (state, { lesson }) => {
    return { ...state, [lesson.id]: { ...lesson } };
  },
  [ADD_LESSONS]: (state, { lessons }) => {
    return formatToObjs(lessons);
  },
  [REMOVE_LESSON]: (state, { lessonId }) => {
    delete state[lessonId];
    return state;
  },
  [ADD_ASSIGNMENT_TO_LESSON]: (state, { assignmentId, lessonId }) => {
    const lesson = state[lessonId];
    return { ...state, [lessonId]: { ...lesson, assignments: lesson.assignments.concat(assignmentId) } };
  },
  [REMOVE_ASSIGNMENT_FROM_LESSON]: (state, { assignmentId, studentId}) => {
    const student = state[studentId];
    const assignments = student.assignments;
    return { ...state, [studentId]: { ...student, assignments: assignments.concat(assignmentId) } };
  },
  [ADD_GROUPING_TO_LESSON]: (state, { groupingId, lessonId }) => {
    const lesson = state[lessonId];
    return { ...state, [lessonId]: { ...lesson, groupingId: groupingId } };
  },
  [REMOVE_GROUPING_FROM_LESSON]: (state, { groupingId, lessonId }) => {
    const lesson = state[lessonId];
    return { ...state, [lessonId]: { ...lesson, groupingId: '' } };
  },
}

export default createReducer(initialState, handlers);
