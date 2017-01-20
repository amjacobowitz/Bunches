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
        name: student.name
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

export function getAssignment(groupId) {
  const url = route(`/groups/${groupId}/assignments`);
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
        teacher_id: teacherId,
      }
    }
  )

  return fetchRequest(url, options);
}

export function putAssignment(groupId, assignmentId) {
  const url = route(`/groups/${groupId}/assignments/${assignmentId}`);
  const options = genHTTPOptions('PUT',
    {
      assignment: {
        completed: true,
        submitted: true
      }
    }
  );

  return fetchRequest(url, options);
}

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

export function studentToGroup(student, groupId, teacherId) {
  const url = route(`/students/${student.id}`);
  const options = genHTTPOptions('PUT',
    {
      student: {
        teacher_id: teacherId,
        first_name: student.firstName,
        last_name: student.lastName,
        group_id: groupId,
        id: student.id
      }
    }
  );

  return fetchRequest(url, options);
}


export function studentFromGroup(student, teacherId) {
  const url = route(`/students/${student.id}`);
  const options = genHTTPOptions('PUT',
    {
      student: {
        teacher_id: teacherId,
        group_id: '',
        id: student.id,
        name: student.name,
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

export function createGoal(description, groupId) {
  const url = route(`/goals`);
  const options = genHTTPOptions('POST',
    {
      goal: {
        description: description,
        group_id: groupId
      }
    }
  );

  return fetchRequest(url, options);
}

export function updateStudentGoal(studentId, goalId) {
  const url = route(`/students/${studentId}`);
  const options = genHTTPOptions('PUT',
    {
      student: {
        id: studentId,
        goal_id: goalId
      }
    }
  );

  return fetchRequest(url, options);
}

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
