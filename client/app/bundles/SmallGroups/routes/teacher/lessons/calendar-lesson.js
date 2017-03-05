import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';

const calendarLessonSource = {
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

class CalendarLesson extends Component {
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

export default DragSource('lesson', calendarLessonSource, collect)(CalendarLesson);
