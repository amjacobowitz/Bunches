import {  genHTTPOptions, route, fetchRequest } from './utils/api-config';

export function getTeacher(teacher) {
  const url = route('/auth/teacher');
  const options = genHTTPOptions('POST',
    {

    }
  );

  return fetchRequest(url, options);
}

export function getStudent(student) {
  const url = route('/auth/student');
  const options = genHTTPOptions('POST',
    {
      student: {
        pin: student.pin,
        name: student.name
      }
    }
  )

  return fetchRequest(url, options);
}
