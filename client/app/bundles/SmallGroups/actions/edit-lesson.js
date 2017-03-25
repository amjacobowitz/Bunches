import {
  ADD_LESSON,
  ADD_LESSON_TO_ASSIGNMENT,
  REMOVE_LESSONS_FROM_ASSIGNMENT,
  REMOVE_LESSON
} from './index';

import { putLesson } from '../api';

export default function editLesson(title, vineId, groups, teacherId, lesson) {
  return (dispatch, getState) => {
    const { groupings, assignments } = getState();

    const assignmentIds = groups.map((group) => {
      return group.assignmentId
    });

    putLesson(title, vineId, assignmentIds, lesson.id)
    .then((newLesson) => {
      dispatch({ type: REMOVE_LESSONS_FROM_ASSIGNMENT, lessonId: lesson.id });
      dispatch({ type: REMOVE_LESSON, lessonId: lesson.id });
      dispatch({ type: ADD_LESSON, lesson: newLesson });

      if (newLesson.assignments) {
        newLesson.assignments.forEach((assignment) => {
          dispatch({ type: ADD_LESSON_TO_ASSIGNMENT, lessonId: lesson.id, assignmentId: assignment.id })
        })
      }

    }).catch((err) => {
      console.warn(err);
    });
  };
}
