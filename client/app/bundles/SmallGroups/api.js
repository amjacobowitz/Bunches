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
  const options = genHTTPOptions('GET',
    { id: studentId }
  );

  return fetchRequest(url, options);
}
