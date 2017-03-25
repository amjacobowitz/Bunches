import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { PRIMARY, LIGHT_PRIMARY, GRAY, LIGHTEST_GRAY, WHITE } from '../../../palette';

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
  render() {
    const { isDragging, connectDragSource, lesson, onDoubleClick } = this.props;
    const lessonStyle = isDragging ? { ...styles.dragging, ...styles.default } : styles.default;
    return connectDragSource(
      <div { ...lessonStyle } onDoubleClick={ () => onDoubleClick() }>
        { lesson.title }
      </div>
    )
  }
}

const mapActionsToProps = { };

const styles = {
  default: css({
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    justifyContent: 'center',
    cursor: 'pointer',
  }),
  dragging: css({
    opacity: 0.5,
  }),
}

Lesson = DragSource('lesson', lessonSource, collect)(Lesson);
export default connect(null, mapActionsToProps)(Lesson);
