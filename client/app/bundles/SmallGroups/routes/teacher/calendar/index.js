import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Button from '../../../components/button';

import Lesson from './lesson';
import View from './view';
import Trash from '../../../components/trash';

import fetchTeacher from '../../../actions/fetch-teacher';
import changePath from '../../../actions/change-path';

import { PRIMARY, LIGHT_PRIMARY, GRAY, LIGHTEST_GRAY, WHITE } from '../../../palette';

function displayAssignments(assignments, assignmentIds) {
  return assignmentIds.map((id, index) => {
    return <Assignment assignment={ assignments[id] } key={ id+index } />
  })
}

function Assignment({ assignment }) {
  return (
    <div { ...styles.assignmentView }>
      <div>
        { assignment.title }
      </div>
      <div>
        { assignment.directions }
      </div>
    </div>
  )
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    if (props.klasses.length === 0) {
      props.fetchTeacher(props.params.id);
    }

    this.state = { lesson: {}, showLesson: false };
  }

  onClick = (value, name) => {
    if (name === 'newLesson') {
      this.props.changePath(`/teacher/${this.props.params.id}/lessons/new`);
    } else {
      this.props.changePath(`/teacher/${this.props.params.id}/lessons/${value}/edit`);
    }
  }

  onMouseEnter = (lessonId) => {
    const { lessons } = this.props;
    const lesson = lessons.find((lesson) => lesson.id === lessonId);
    this.setState({ lesson, showLesson: true });
    setTimeout(() => {
      this.setState({ showLesson: false });
    }, 2000)
  }

  onMouseLeave = () => {
    this.setState({ lesson: {}, showLesson: false });
  }

  render() {
    const { assignments, lessons, params } = this.props;
    const { showLesson, lesson } = this.state;
    const teacherId = params.id;

    return (
      <div { ...styles.routeContainer }>
        <div { ...styles.sidebar }>
          <Trash teacherId={ params.id }/>
          Lessons
          <Button
            onClick={ () => this.onClick(null, 'newLesson') }
            text='new'
            style={ styles.button }
            textStyle={ styles.buttonText }
          />
          <div { ...styles.lessonsContainer }>
            {
              lessons.map((lesson, i) => {
                return (
                  <div onClick={ () => this.onClick(lesson.id, 'editLesson') } key={ lesson+i } >
                    <Lesson
                      lesson={ lesson }
                      onMouseEnter={ this.onMouseEnter }
                      onMouseLeave={ this.onMouseLeave }
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div>
          <View teacherId={ teacherId }/>
        </div>
        {
          showLesson && (
            <div { ...styles.lessonView }>
              <div>{ lesson.title }</div>
              <div> Assignments </div>
              <div>{ displayAssignments(assignments, lesson.assignments) }</div>
            </div>
          )
        }
      </div>
    );
  }
}

const styles = {
  routeContainer: css({
    display: 'flex',
    textAlign: 'center',
  }),
  sidebar: css({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '-90px',
    paddingRight: '20px',
    borderRight: `1px solid ${PRIMARY}`,
  }),
  button: css({
    marginTop: '10px',
    height: '30px',
    width: '120px',
    padding: '3px',
  }),
  buttonText: css({
    fontSize: '14px'
  }),
  assignmentsContainer: css({
    display: 'flex',
    justifyCOntent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
  }),
  lessonView: css({
    zIndex: 999,
    position: 'absolute',
    border: `1px solid ${PRIMARY}`,
    marginLeft: '100px',
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    backgroundColor: WHITE,
    padding: '10px',
  }),
  assignmentView: css({
    border: `1px solid ${LIGHTEST_GRAY}`,
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    padding: '5px',
  }),
};

const mapActionsToProps = {
  fetchTeacher,
  changePath,
};

const mapStateToProps = ({
  klasses,
  assignments,
  lessons
}) => ({
  klasses: Object.values(klasses),
  lessons: Object.values(lessons),
  assignments,
});

Calendar = DragDropContext(HTML5Backend)(Calendar);
export default connect(mapStateToProps, mapActionsToProps)(Calendar);
