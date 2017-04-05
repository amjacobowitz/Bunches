import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { PRIMARY, LIGHT_GRAY, BLACK, LIGHT_PRIMARY, WHITE } from '../../../palette';

const close = require('!!url!../vine/close.png');
const closeRed = require('!!url!../vine/close-red.png');

import removeLesson from '../../../actions/remove-lesson';

class View extends Component {
  render() {
    const { assignments, title, lesson, teacherId } = this.props;
    return (
      <div { ...styles.lesson }>
        <div { ...styles.closeContainer }>
          <div { ...styles.close }  onClick={ () => this.props.removeLesson(lesson, teacherId) } />
        </div>

        <div { ...styles.title }>{ title }</div>

        {
          assignments.map((assignment) => {
            return (
              <div key={ assignment.id } { ...styles.assignment }>
                <div>{ assignment.title }</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const styles = {
  lesson: css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '200px',
    height: '200px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    marginRight: '10px',
    marginBottom: '10px',
  }),
  title: css({
    fontFamily: 'BlinkMacSystemFont',
    fontSize: '18px',
  }),
  assignment: css({
    fontFamily: 'BlinkMacSystemFont'
  }),
  close: css({
    marginRight: '5px',
    marginTop: '5px',
    backgroundImage: `url(${ close })`,
    width: '20px',
    height: '20px',
    ':hover': {
      backgroundImage: `url(${ closeRed })`,
    }
  }),
  closeContainer: css({
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: '5px',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    cursor: 'pointer',
  }),

};

const mapActionsToProps = {
  removeLesson
};

const mapStateToProps = ({ assignments }, ownProps) => {
  const lessonAssignments = Object.values(assignments).filter((assignment) => {
    if (assignment.lessons.includes(ownProps.lesson.id)) {
      return assignment;
    }
  })

  return {
    assignments: lessonAssignments
  }
};

export default connect(mapStateToProps, mapActionsToProps)(View);
