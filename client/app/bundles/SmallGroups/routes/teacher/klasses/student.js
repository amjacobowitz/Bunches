import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';

import { LIGHT_PRIMARY, SECONDARY } from '../../../palette';

const studentSource = {
  beginDrag(props) {
    const { student } = props;
    return { ...student };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Student extends Component {
  render() {
    const { isDragging, connectDragSource, student } = this.props;
    const studentStyle = isDragging ? { ...styles.dragging, ...styles.default } : styles.default;
    return connectDragSource(
      <div { ...studentStyle }>
        { student.firstName }
      </div>
    );
  }
}

const styles = {
  default: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontWeight: 100,
    color: LIGHT_PRIMARY,
    border: `1px solid ${SECONDARY}`,
    margin: '10px',
    cursor: 'pointer',
    fontSize: '10px',
  }),
  dragging: css({
    opacity: 0.5,
  }),
}

export default DragSource('student', studentSource, collect)(Student);
