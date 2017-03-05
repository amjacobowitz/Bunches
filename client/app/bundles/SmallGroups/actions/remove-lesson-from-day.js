import {
  REMOVE_LESSON_FROM_DAY
} from './index';

import { lessonFromDay } from '../api';

export default function removeLessonFromDay(lessonId, dayId) {
  return (dispatch) => {
    lessonFromDay(lessonId, dayId)
    .then((l) => {
      dispatch({ type: REMOVE_LESSON_FROM_DAY, lessonId, dayId })
    }).catch((e) => {
      console.warn(e);
    })
  }
}
