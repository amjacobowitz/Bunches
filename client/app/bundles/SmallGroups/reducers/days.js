import { createReducer } from 'redux-create-reducer';
import {
  ADD_DAY,
  ADD_DAYS,
  REMOVE_DAY,
  ADD_LESSON_TO_DAY,
  ADD_ASSIGNMENT_TO_DAY,
  REMOVE_LESSON_FROM_DAY,
  REMOVE_ASSIGNMENT_FROM_DAY,
  ADD_DATE_TO_DAY,
} from '../actions/index';

const initialState = {};

const removeAssociation = (rId, rs) => {
  const index = rs.indexOf(rId);
  const before = rs.slice(0, index);
  const after = rs.slice(index + 1, rs.length);
  return before.concat(after);
};

const formatToObjs = (records) => {
  const results = records.reduce((result, r) => {
    result[r.id] = {
      id: r.id,
      date: {
        year: Number(r.date.slice(0,4)),
        month: Number(r.date.slice(5,7)),
        day: Number(r.date.slice(8,10))
      },
      lessons: r.lessons.map((l) => l.id),
      assignments: r.assignments.map((a) => a.id),
    }
    return result;
  }, {});
  return { ...results };
}

const handlers = {
  [ADD_DAYS]: (state, { days }) => {
    return { ...formatToObjs(days) };
  },
  [ADD_DAY]: (state, { dayId, date, lessonId, assignments }) => {
    return {  ...state,
      [dayId]: {
        id: dayId,
        date: {
          year: date.year,
          month: date.month,
          day: date.day
        },
        lessons: [lessonId],
        assignments: assignments
      }
    }
  },
  [ADD_DATE_TO_DAY]: (state, { date, dayId }) => {
    const day = state[dayId];
    return { ...state, [dayId]: { ...day, date: date } };
  },
  [ADD_LESSON_TO_DAY]: (state, { lessonId, dayId }) => {
    const day = state[dayId];
    return { ...state, [dayId]: { ...day, lessons: day.lessons.concat(lessonId) } };
  },
  [ADD_ASSIGNMENT_TO_DAY]: (state, { assignmentId, dayId }) => {
    const day = state[dayId];
    return { ...state, [dayId]: { ...day, assignments: day.assignments.concat(assignmentId) } };
  },
  [REMOVE_LESSON_FROM_DAY]: (state, { lessonId, dayId }) => {
    const day = state[dayId];
    return { ...state, [dayId]: { ...day, lessons: removeAssociation(lessonId, day.lessons) } };
  },
  [REMOVE_ASSIGNMENT_FROM_DAY]: (state, { assignmentId, dayId }) => {
    const day = state[dayId];
    return { ...state, [dayId]: { ...day, assignments: removeAssociation(assignmentId, day.assignments) } };
  }

};

export default createReducer(initialState, handlers);
