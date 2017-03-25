import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import removeStudentFromGroup from '../../../actions/remove-student-from-group';

import { LIGHT_PRIMARY, SECONDARY } from '../../../palette';

const studentInGroupSource = {
  beginDrag(props) {
    return {
      ...props.student,
      number: props.number,
      fromGroup: props.fromGroup
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class StudentInGroup extends Component {
  render() {
    const { isDragging, connectDragSource, student, number, fromGroup, removeStudentFromGroup } = this.props;

    const studentStyle = isDragging ? { ...styles.dragging, ...styles.default } : styles.default;
    return connectDragSource(
      <div { ...studentStyle } onDoubleClick={ () => removeStudentFromGroup(student, fromGroup) }>
        <div { ...styles.name }>{ number }) { student.firstName }</div>
      </div>
    );
  }
}

const styles = {
  dragging: css({
    opacity: 0.5,
  }),
  default: css({
    marginLeft: '10px',
    cursor: 'pointer',
      }),
  name: css({
    padding: '3px',
    border: '1px solid white',
    ':hover': {
      border: `1px solid ${LIGHT_PRIMARY}`,
      borderRadius: '4px',
    },
  })
}

const mapActionsToProps = {
  removeStudentFromGroup
};

StudentInGroup =  DragSource('student', studentInGroupSource, collect)(StudentInGroup);
export default connect(null, mapActionsToProps)(StudentInGroup);
