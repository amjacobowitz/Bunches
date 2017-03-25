import {
  REMOVE_LESSON_FROM_DAY,
  REMOVE_ASSIGNMENT_FROM_DAY
} from './index';

import { lessonFromDay } from '../api';

export default function removeLessonFromDay(lessonId, dayId) {
  return (dispatch, getState) => {
    const { lessons } = getState();
    const lesson = lessons[lessonId];

    lessonFromDay(lessonId, dayId)
    .then((l) => {
      dispatch({ type: REMOVE_LESSON_FROM_DAY, lessonId, dayId })
      lesson.assignments.forEach((assignmentId) => {
        dispatch({ type: REMOVE_ASSIGNMENT_FROM_DAY, assignmentId, dayId });
      });
    }).catch((e) => {
      console.warn(e);
    })
  }
}
