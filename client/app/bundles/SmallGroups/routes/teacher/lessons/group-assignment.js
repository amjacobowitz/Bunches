import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';

const groupAssignmentSource = {
  beginDrag(props) {
    const { assignment } = props;
    return { ...assignment };
  }
};

function collect(connect, monitor) {
  return {
   connectDragSource: connect.dragSource(),
   isDragging: monitor.isDragging()
  };
}

class GroupAssignment extends Component {
  render() {
    const { isDragging, connectDragSource, assignment, onDoubleClick } = this.props;
    const assignmentStyle = isDragging ? { ...styles.dragging, ...styles.default } : styles.default;
    return connectDragSource(
      <div { ...assignmentStyle } onDoubleClick={ onDoubleClick }>
        { assignment.title }
      </div>
    )
  }
}

const styles = {
  default: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }),
  dragging: css({
    opacity: 0.5,
  }),
}

export default DragSource('assignment', groupAssignmentSource, collect)(GroupAssignment);
