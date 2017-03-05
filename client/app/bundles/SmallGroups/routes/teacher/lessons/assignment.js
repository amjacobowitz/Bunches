import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';

import { PRIMARY } from '../../../palette';

const assignmentSource = {
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

class Assignment extends Component {
  render() {
    const { isDragging, connectDragSource, assignment, onMouseEnter, onMouseLeave } = this.props;
    const assignmentStyle = isDragging ? { ...styles.dragging, ...styles.default } : styles.default;
    return connectDragSource(
      <div
        { ...assignmentStyle }
        onMouseEnter={ () => onMouseEnter(assignment.id) }
        onMouseLeave={ onMouseLeave }
      >
        { assignment.title }
      </div>
    );
  }
}

const styles = {
  default: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    width: '100px',
    height: '20px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    margin: '10px',
    cursor: 'pointer',
    fontSize: '10px',
  }),
  dragging: css({
    opacity: 0.5,
  }),
}

export default DragSource('assignment', assignmentSource, collect)(Assignment);
