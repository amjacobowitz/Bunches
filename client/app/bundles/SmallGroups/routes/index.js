import React from 'react';
import { Route } from 'react-router';

import Layout from './layout/index';

import StudentLanding from './student/landing';
import Assignment from './student/assignment/index';
import Review from './student/review/index';

import TeacherLanding from './teacher/landing';
import Dashboard from './teacher/dashboard/index';
import Klasses from './teacher/klasses/index';
import Assignments from './teacher/assignments/index';
import Analysis from './teacher/analysis/index';

export default (store) => (
  <Route component={ Layout }>
    <Route path="/student" component={ StudentLanding } />
      <Route path="/student/:id/assignment" component={ Assignment } />
      <Route path="/student/:id/review" component={ Review } />
    <Route path="/teacher" component={ TeacherLanding } />
      <Route path="/teacher/:id/dashboard" component={ Dashboard } />
      <Route path="/teacher/:id/classes" component={ Klasses } />
      <Route path="/teacher/:id/assignments" component={ Assignments } />
      <Route path="/teacher/:id/analysis" component={ Analysis } />
  </Route>
)
