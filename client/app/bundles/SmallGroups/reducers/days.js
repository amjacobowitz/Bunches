import { createReducer } from 'redux-create-reducer';
import {
  ADD_DAY,
  ADD_DAYS,
  REMOVE_DAY,
  ADD_LESSON_TO_DAY,
  REMOVE_LESSON_FROM_DAY,
  ADD_DATE_TO_DAY,
} from '../actions/index';

const initialState = {};

const removeLesson = (lessonId, lessons) => {
  const index = lessons.indexOf(lessonId);
  const before = lessons.slice(0, index);
  const after = lessons.slice(index + 1, lessons.length);
  return before.concat(after);
};

const formatToObjs = (records) => {
  const results = records.reduce((result, r) => {
    result[r.id] = {
      id: r.id,
      date: {
        year: Number(r.date.slice(0,4)),
        month: Number(r.date.slice(6,7)),
        day: Number(r.date.slice(9,10))
      },
      lessons: r.lessons.map((l) => l.id),
    }
    return result;
  }, {});
  return { ...results };
}

const handlers = {
  [ADD_DAYS]: (state, { days }) => {
    return { ...formatToObjs(days) };
  },
  [ADD_DAY]: (state, { dayId, date, lessonId }) => {
    return {  ...state,
      [dayId]: {
        id: dayId,
        date: {
          year: date.year,
          month: date.month,
          day: date.day
        },
        lessons: [lessonId],
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
  [REMOVE_LESSON_FROM_DAY]: (state, { lessonId, dayId }) => {
    const day = state[dayId];
    return { ...state, [dayId]: { ...day, lessons: removeLesson(lessonId, day.lessons) } };
  }
};

export default createReducer(initialState, handlers);
