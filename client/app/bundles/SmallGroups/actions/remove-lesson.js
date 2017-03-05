import {
  REMOVE_LESSON,
  REMOVE_LESSON_FROM_ASSIGNMENT,
  REMOVE_LESSON_FROM_DAY,
} from './index';

import { destroyLesson } from '../api';

export default function removeLesson(lesson, teacherId) {
  return (dispatch, getState) => {
    return destroyLesson(lesson, teacherId)
    .then(() => {

      if (lesson.assignments) {
        lesson.assignments.forEach((assignmentId) => {
          dispatch({ REMOVE_LESSON_FROM_ASSIGNMENT, lessonId: lesson.id, assignmentId });
        });
      }

      const { days } = getState();

      Object.values(days).forEach((day) => {
        if (day.lessons.includes(lesson.id)) {
          dispatch({ type: REMOVE_LESSON_FROM_DAY, lessonId: lesson.id, dayId: day.id });
        }
      })

      dispatch({ type: REMOVE_LESSON, lessonId: lesson.id });
    }).catch((e) => {
      console.warn(e);
    })
  }
}
