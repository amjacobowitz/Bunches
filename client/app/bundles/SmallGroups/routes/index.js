import React from 'react';
import { Route } from 'react-router';

import StudentLanding from './student/landing';
import TeacherLanding from './teacher/landing';
import Assignment from './student/assignment/index';
import Layout from './layout/index';

export default (store) => (
  <Route component={ Layout }>
    <Route path="/student" component={ StudentLanding } />
      <Route path="/student/assignment" component={ Assignment } />
    <Route path="/teacher" component={ TeacherLanding } />
  </Route>
)
