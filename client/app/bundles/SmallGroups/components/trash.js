import React, { Component } from 'react';
import { css } from 'glamor';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

const trashImg = require('!!url!./trash.png');

import removeGrouping from '../actions/remove-grouping';
import removeStudent from '../actions/remove-student';
import removeAssignment from '../actions/remove-assignment';
import removeLesson from '../actions/remove-lesson';

const trashTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if(item.hasOwnProperty('firstName')) {
      props.removeStudent(item, props.teacherId);
    } else if(item.hasOwnProperty('dayId')) {
      props.removeLesson(item, props.teacherId);
    } else if (item.hasOwnProperty('groups')) {
      props.removeAssignment(item, props.teacherId);
    } else {
      props.removeGrouping(item, props.teacherId);
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class Trash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div>
        <img
          { ...styles.trash }
          src={ trashImg }
        />
      </div>
    )
  }
}

const styles = {
  trash: css({
    width: '50px',
  })
}

const mapActionsToProps = {
  removeGrouping,
  removeStudent,
  removeAssignment,
  removeLesson
}

const mapStateToProps = ({}) => ({

});

Trash = DropTarget(['lesson', 'assignment', 'student', 'grouping'], trashTarget, collect)(Trash);
export default connect(mapStateToProps, mapActionsToProps)(Trash);
