import React, { Component } from 'react';
import { css } from 'glamor';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import moment from 'moment';

import CalendarLesson from './calendar-lesson';

import addLessonToDay from '../../../actions/add-lesson-to-day';
import removeLessonFromDay from '../../../actions/remove-lesson-from-day';

import {
  WHITE,
  PRIMARY,
  LIGHTEST_GRAY,
} from '../../../palette';

const dayTarget = {
  drop(props, monitor) {
    const lesson = monitor.getItem();
    const { day } = props;
    const date = {
      year: day.year(),
      month: day.month() + 1,
      day: day.date(),
    };
    props.addLessonToDay(date, lesson, props.teacherId);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class Day extends Component {
  constructor(props) {
    super(props);
  }

  onDoubleClick = () => {
    const { lesson, stateDay } = this.props;
    this.props.removeLessonFromDay(lesson.id, stateDay.id);
  }

  render() {
    const {
      numericalDate,
      day,
      index,
      lesson,
      beginningOfMonth,
      endOfMonth,
      connectDropTarget,
    } = this.props;

    const isBeforeMonth = day.isBefore(beginningOfMonth, 'day');
    const isAfterMonth = day.isAfter(endOfMonth, 'day');
    const isDifferentMonth = isBeforeMonth || isAfterMonth

    const remainder = index % 7;
    const isWeekend = remainder === 0 || remainder === 6;

    const dayStyle = isDifferentMonth || isWeekend ?
      css(styles.otherDay, styles.weekDay) :
      styles.weekDay;
    return connectDropTarget(
      <td { ...dayStyle }>
        { numericalDate }
        <CalendarLesson
          lesson={ lesson }
          onDoubleClick={ this.onDoubleClick }
        />
      </td>
    );
  }
}

const styles = {
  weekDay: css({
    fontFamily: 'BlinkMacSystemFont',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '130px',
    height: '130px',
    fontWeight: 100,
    borderLeft: `1px solid ${PRIMARY}`,
    borderTop: `1px solid ${PRIMARY}`,
  }),
  otherDay: css({
    backgroundColor: LIGHTEST_GRAY,
  }),
}

const mapActionsToProps = {
  addLessonToDay,
  removeLessonFromDay
};

const mapStateToProps = ({}) => {
  return {

  };
};

Day = DropTarget('lesson', dayTarget, collect)(Day);
export default connect(mapStateToProps, mapActionsToProps)(Day);
