import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';

import { PRIMARY } from '../../../palette';

const lessonSource = {
  beginDrag(props) {
    const { lesson } = props;
    return { ...lesson };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isDragging, connectDragSource, lesson, onMouseEnter, onMouseLeave } = this.props;
    const lessonStyle = isDragging ? { ...styles.dragging, ...styles.default } : styles.default;
    return connectDragSource(
      <div
        { ...lessonStyle }
        onMouseEnter={ () => onMouseEnter(lesson.id) }
        onMouseLeave={ onMouseLeave }
      >
        { lesson.title }
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

export default DragSource('lesson', lessonSource, collect)(Lesson);
