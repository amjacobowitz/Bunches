import { createReducer } from 'redux-create-reducer';
import {
  ADD_LESSON,
  ADD_LESSONS,
  REMOVE_LESSON,
  ADD_DATE_TO_LESSON,
  ADD_ASSIGNMENT_TO_LESSON,
  REMOVE_ASSIGNMENT_FROM_LESSON,
  ADD_GROUPING_TO_LESSON,
  REMOVE_GROUPING_FROM_LESSON,
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
         title: r.title,
         vineId: r.groupings.map((g) => g.id)[0],
         assignments: r.assignments.map((a) => a.id),
         days: r.days.map((day) => {
           return day.id;
         })
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
    return { ...state,
      [lesson.id]: {
        id: lesson.id,
        title: lesson.title,
        vineId: lesson.groupings.map((g) => g.id)[0],
        assignments: lesson.assignments.map((a) => a.id),
        days: lesson.days.map((day) => day.id )
      }
    };
  },
  [ADD_LESSONS]: (state, { lessons }) => {
    return formatToObjs(lessons);
  },
  [REMOVE_LESSON]: (state, { lessonId }) => {
    delete state[lessonId];
    return { ...state };
  },
  [ADD_ASSIGNMENT_TO_LESSON]: (state, { assignmentId, lessonId }) => {
    const lesson = state[lessonId];
    return { ...state, [lessonId]: { ...lesson, assignments: lesson.assignments.concat(assignmentId) } };
  },
  [ADD_DATE_TO_LESSON]: (state, { date, lessonId }) => {
    const lesson = state[lessonId];
    return { ...state, [lessonId]: { ...lesson, date } };
  },
  [REMOVE_ASSIGNMENT_FROM_LESSON]: (state, { assignmentId, lessonId}) => {
    const lesson = state[lessonId];
    const assignments = removeAssociation(assignmentId, lesson.assignments);
    return { ...state, [lessonId]: { ...lesson, assignments } };
  },
  [ADD_GROUPING_TO_LESSON]: (state, { groupingId, lessonId }) => {
    const lesson = state[lessonId];
    return { ...state, [lessonId]: { ...lesson, groupings: groupings.concat(groupingId) } };
  },
  [REMOVE_GROUPING_FROM_LESSON]: (state, { groupingId, lessonId }) => {
    const lesson = state[lessonId];
    const groupings = removeAssociation(groupingId, lesson.groupings);
    return { ...state, [lessonId]: { ...lesson, groupings } };
  },
}

export default createReducer(initialState, handlers);
