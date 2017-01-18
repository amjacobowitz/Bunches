import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';

import { LIGHT_PRIMARY, SECONDARY } from '../../../palette';

const studentInGroupSource = {
  beginDrag(props) {
    return {
      ...props.student,
      number: props.number
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
    const { isDragging, connectDragSource, student, number } = this.props;
    const studentStyle = isDragging ? { ...styles.dragging, ...styles.default } : styles.default;
    return connectDragSource(
      <div { ...studentStyle }>
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

export default DragSource('student', studentInGroupSource, collect)(StudentInGroup);
