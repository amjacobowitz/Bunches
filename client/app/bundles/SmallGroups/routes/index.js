import React from 'react';
import { Route } from 'react-router';

import Layout from './layout/index';

import StudentLanding from './student/landing';
import Assignment from './student/assignment/index';
import Review from './student/review/index';

import TeacherLanding from './teacher/landing';
import Dashboard from './teacher/dashboard/index';
import Groups from './teacher/groups/index';
import Lessons from './teacher/lessons/index';
import NewLesson from './teacher/lessons/new-lesson';
import Analysis from './teacher/analysis/index';

export default (store) => (
  <Route component={ Layout }>
    <Route path="/student" component={ StudentLanding } />
      <Route path="/student/:id/assignment" component={ Assignment } />
      <Route path="/student/:id/review" component={ Review } />
    <Route path="/teacher" component={ TeacherLanding } />
      <Route path="/teacher/:id/dashboard" component={ Dashboard } />
      <Route path="/teacher/:id/groups" component={ Groups } />
      <Route path="/teacher/:id/lessons" component={ Lessons } />
      <Route path="/teacher/:id/lessons/new" component={ NewLesson } />
      <Route path="/teacher/:id/analysis" component={ Analysis } />
  </Route>
)
