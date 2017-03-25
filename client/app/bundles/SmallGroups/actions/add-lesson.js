import { ADD_LESSON, ADD_LESSON_TO_ASSIGNMENT } from './index';

import { createLesson } from '../api';

export default function addLesson(title, vineId, groups, teacherId) {
  return (dispatch, getState) => {
    const { groupings, assignments } = getState();

    const assignmentIds = groups.map((group) => {
      return group.assignmentId
    });
    createLesson(title, vineId, assignmentIds, teacherId)
    .then((lesson) => {
      dispatch({ type: ADD_LESSON, lesson });
      if (lesson.assignments) {
        lesson.assignments.forEach((assignment) => {
          dispatch({ type: ADD_LESSON_TO_ASSIGNMENT, lessonId: lesson.id, assignmentId: assignment.id })
        })
      }
    }).catch((err) => {
      console.warn(err);
    });
  };
}
