import React from 'react';
import { Route } from 'react-router';

import Layout from './layout/index';

import StudentLanding from './student/landing';
import Assignment from './student/assignment/index';
import Review from './student/review/index';

import Analysis from './teacher/analysis/index';
import Assignments from './teacher/assignments/index';
import Calendar from './teacher/calendar/index';
import Dashboard from './teacher/dashboard/index';
import LessonEdit from './teacher/lessons/edit';
import LessonsIndex from './teacher/lessons/index';
import LessonNew from './teacher/lessons/new';
import LessonShow from './teacher/lessons/show';
import Live from './teacher/live/index';
import TeacherLanding from './teacher/landing';
import Vines from './teacher/vines/index';
import Vine from './teacher/vine/index';

export default (store) => (
  <Route component={ Layout }>
    <Route path="/student" component={ StudentLanding } />
    <Route path="/student/:id/assignment" component={ Assignment } />
    <Route path="/student/:id/review" component={ Review } />
    <Route path="/teacher" component={ TeacherLanding } />
    <Route path="/teacher/:id/dashboard" component={ Dashboard } />
    <Route path="/teacher/:id/vines" component={ Vines }>
      <Route path="/teacher/:id/vines/:vineId" component={ Vine } />
    </Route>
    <Route path="/teacher/:id/calendar" component={ Calendar } />
    <Route path="/teacher/:id/lessons" component={ LessonsIndex } />
    <Route path="/teacher/:id/lessons/new" component={ LessonNew }/>
    <Route path="/teacher/:id/lessons/:lessonId/edit" component={ LessonEdit }/>
    <Route path="/teacher/:id/lessons/:lessonId/:dayId" component={ LessonShow } />
    <Route path="/teacher/:id/assignments" component={ Assignments } />
    <Route path="/teacher/:id/live" component={ Live } />
    <Route path="/teacher/:id/analysis" component={ Analysis } />
  </Route>
)
