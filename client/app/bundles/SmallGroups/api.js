import {  genHTTPOptions, route, fetchRequest } from './utils/api-config';

export function authorizeTeacher(teacher) {
  const url = route('/auth/teacher');
  const options = genHTTPOptions('POST',
    {
      teacher: {
        password: teacher.password,
        email: teacher.email
      }
    }
  );

  return fetchRequest(url, options);
}

export function authorizeStudent(student) {
  const url = route('/auth/student');
  const options = genHTTPOptions('POST',
    {
      student: {
        pin: student.pin,
        first_name: student.name
      }
    }
  );

  return fetchRequest(url, options);
}

export function getStudent(studentId) {
  const url = route(`/students/${studentId}`);
  const options = genHTTPOptions('GET', null);

  return fetchRequest(url, options);
}

export function getAssignment(studentId) {
  const url = route(`/students/${studentId}/assignment`);
  const options = genHTTPOptions('GET', null);

  return fetchRequest(url, options);
}

export function createAssignment(assignment, teacherId) {
  const url = route('/assignments');
  const options = genHTTPOptions('POST',
    {
      assignment: {
        directions: assignment.directions,
        title: assignment.title,
      },
      teacher_id: teacherId
    }
  )

  return fetchRequest(url, options);
}

export function putAssignment(assignment, teacherId) {
  const url = route(`/assignments/${assignment.id}`);
  const options = genHTTPOptions('PUT',
    {
      assignment: {
        directions: assignment.directions,
        title: assignment.title,
      },
    }
  )

  return fetchRequest(url, options);
}

export function createSubmission(studentId, assignmentId, raw) {
  const url = route(`/submissions`);
  const options = genHTTPOptions('POST',
    {
      submission: {
        student_id: studentId,
        assignment_id: assignmentId,
      },
      answer: raw
    }
  );

  return fetchRequest(url, options);
}

export function putSubmission(submissionId, raw, score) {
  const url = route(`/submissions/${submissionId}`);
  const options = genHTTPOptions('PUT', {
    submission: {
      id: submissionId,
      score: score,
    },
    answer: raw
  })

  return fetchRequest(url, options);
}

export function completeSubmission(submissionId, review, rating) {
  const url = route(`/submissions/${submissionId}`);
  const options = genHTTPOptions('PUT', {
    submission: {
      review: review,
      rating: rating
    },
  })

  return fetchRequest(url, options);
}

export function groupToAssignment(assignmentId, groupId) {
  const url = route(`/groups/${groupId}`);
  const options = genHTTPOptions('PUT',
    {
      group: {
        id: groupId,
        assignment_id: assignmentId
      },
    }
  );

  return fetchRequest(url, options);
}

export function groupFromAssignment(assignmentId, groupId) {
  const url = route(`/groups/${groupId}`);
  const options = genHTTPOptions('PUT',
    {
      group: {
        assignment_id: ''
      },
    }
  );

  return fetchRequest(url, options);
}

export function createLesson(title, vineId, assignmentIds, teacherId) {
  const url = route(`/lessons`);
  const options = genHTTPOptions('POST',
    {
      lesson: {
        title,
        grouping_id: vineId,
        assignment_ids: assignmentIds,
        teacher_id: teacherId
      }
    }
  )

  return fetchRequest(url, options);
}

export function putLesson(title, vineId, assignmentIds, lessonId) {
  const url = route(`/lessons/${lessonId}`);
  const options = genHTTPOptions('PUT',
    {
      lesson: {
        title,
        grouping_id: vineId,
        assignment_ids: assignmentIds,
      }
    }
  )

  return fetchRequest(url, options);
}

export function lessonToDay(lessonId, date, teacherId, assignmentIds) {
  const url = route(`/lessons/${lessonId}`);
  const options = genHTTPOptions('PUT',
    {
      lesson: {
        id: lessonId,
        date: {
          year: date.year,
          month: date.month,
          day: date.day,
        },
        assignment_ids: assignmentIds
      },
      teacher_id: teacherId
    }
  );

  return fetchRequest(url, options);
};

export function lessonFromDay(lessonId, dayId) {
  const url = route(`/days/${dayId}`);
  const options = genHTTPOptions('PUT',
    {
      day: {
        lesson_id: lessonId,
      }
    }
  );

  return fetchRequest(url, options);
};

export function createStudent(student, teacherId) {
  const url = route('/students');
  const options = genHTTPOptions('POST',
    {
      student: {
        teacher_id: teacherId,
        first_name: student.firstName,
        last_name: student.lastName
      }
    }
  );

  return fetchRequest(url, options);
}

export function destroyStudent(student) {
  const url = route(`/students/${student.id}`);
  const options = genHTTPOptions('DELETE',
    {
      id: student.id
    }
  );

  return fetchRequest(url, options);
}

export function destroyGrouping(grouping) {
  const url = route(`/groupings/${grouping.id}`);
  const options = genHTTPOptions('DELETE',
    {
      id: grouping.id
    }
  );

  return fetchRequest(url, options);
}

export function destroyAssignment(assignment) {
  const url = route(`/assignments/${assignment.id}`);
  const options = genHTTPOptions('DELETE',
    {
      id: assignment.id
    }
  );

  return fetchRequest(url, options);
}

export function destroyLesson(lesson) {
  const url = route(`/lessons/${lesson.id}`);
  const options = genHTTPOptions('DELETE',
    {
      id: lesson.id
    }
  );

  return fetchRequest(url, options);
}

export function studentToGroup(student, groupId, teacherId) {
  const url = route(`/groups/${groupId}`);
  const options = genHTTPOptions('PUT',
    {
      group: {
        student_id: student.id
      }
    }
  );

  return fetchRequest(url, options);
}

export function studentFromGroup(student, groupId) {
  const url = route(`/groups/${groupId}/remove_student`);
  const options = genHTTPOptions('PUT',
    {
      group: {
        student_id: student.id
      }
    }
  );

  return fetchRequest(url, options);
}

export function createGroup(groupingId) {
  const url = route('/groups');
  const options = genHTTPOptions('POST',
    {
      group: {
        grouping_id: groupingId
      }
    }
  );

  return fetchRequest(url, options);
}

export function createGrouping(grouping, teacherId) {
  const url = route('/groupings');
  const options = genHTTPOptions('POST',
    {
      grouping: {
        teacher_id: teacherId,
        title: grouping.title,
      }
    }
  );

  return fetchRequest(url, options);
}

export function destroyGroup(group) {
  const url = route(`/groups/${group.id}`);
  const options = genHTTPOptions('DELETE',
    {
      group: {
        id: group.id,
      }
    }
  );

  return fetchRequest(url, options);
}

export function createGoal(description, groupId, studentIds, teacherId) {
  const url = route(`/goals`);
  const options = genHTTPOptions('POST',
    {
      description: description,
      group_id: groupId,
      teacher_id: teacherId,
      student_ids: studentIds,
    }
  );

  return fetchRequest(url, options);
}

export function updateGoal(description, studentIds, goalId) {
  const url = route(`/goals/${goalId}`);
  const options = genHTTPOptions('PUT',
    {
      id: goalId,
      description: description,
      student_ids: studentIds,
    }
  );

  return fetchRequest(url, options);
}

export function updateGroupName(groupId, name) {
  const url = route(`/groups/${groupId}`);
  const options = genHTTPOptions('PUT',
    {
      group: {
        id: groupId,
        name: name
      }
    }
  )

  return fetchRequest(url, options);
};

export function getStudents(klassId) {
  const url = route(`/klasses/${klassId}`);
  const options = genHTTPOptions('GET',
    {
      klass: {
        id: klassId
      }
    }
  );

  return fetchRequest(url, options);
}

export function getTeacher(teacherId) {
  const url = route(`/teachers/${teacherId}`)
  const options = genHTTPOptions('GET',
    {
      teacher: {
        id: teacherId
      }
    }
  );

  return fetchRequest(url, options);
}

export function getGroupings(klassId) {
  const url = route(`/klasses/${klassId}`);
  const options = genHTTPOptions('GET',
    {
      klass: {
        id: klassid
      }
    }
  )

  return fetchRequest(url, options);
}

export function getGoals(klassId) {
  const url = route(`/students`);
  const options = genHTTPOptions('GET',
    {
      student: {
        klass_id: klassId
      }
    }
  )

  return fetchRequest(url, options);
}

