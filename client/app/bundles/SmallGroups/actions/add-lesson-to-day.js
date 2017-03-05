import {
  ADD_DAY,
  ADD_DATE_TO_DAY,
  ADD_LESSON_TO_DAY
} from './index';

import { lessonToDay } from '../api';

export default function addLessonToDay(date, lesson, teacherId) {
  return (dispatch, getState) => {
    const { days } = getState();

    const existingDy = Object.values(days).find((day) =>
      day.date.year === date.year &&
      day.date.month === date.month &&
      day.date.day === date.day
    )
    lessonToDay(lesson.id, date, teacherId)
    .then((l) => {
      l.days.forEach((day) => {
        if (!Object.keys(days).includes(day.id)) {
          dispatch({ type: ADD_DAY, dayId: day.id, date: date, lessonId: lesson.id });
        } else if (!days[day.id].lessons.includes(l.id)){
          dispatch({ type: ADD_LESSON_TO_DAY, lessonId: l.id, dayId: day.id })
        }
      })
    }).catch((e) => {
      console.warn(e);
    });
  }
}
