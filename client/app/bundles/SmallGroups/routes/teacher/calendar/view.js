import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import moment from 'moment';

import Day from './day';

import {
  WHITE,
  PRIMARY,
  LIGHT_PRIMARY,
  LIGHTEST_PRIMARY,
  SECONDARY,
  GRAY,
  LIGHT_GRAY,
} from '../../../palette';

const mapDaysOfMonth = (month, beginMonth, endMonth) => {
  const previousMonth = beginMonth.clone().subtract(1, 'month');
  const nextMonth = endMonth.clone().add(1, 'month');

  //this months's starting numerical day of the week + add 1 since Monday is the 0 day
  const d1 = beginMonth.day() - 1;

  // number of days in the last month
  const d2 = previousMonth.endOf('month').date();

  //number of days in this month
  const d3 = endMonth.date();

  let orderedDays = [], i;

  // collect the days from last month to display
  for (i =  d2 - d1; i <= d2; i++) {
    orderedDays.push(previousMonth.clone().date(i));
  }

  // collect the days in this month to display
  for (i = 1; i <= d3; i++) {
    orderedDays.push(moment().month(month).clone().date(i));
  }
  // collect the days from next month to display
  // 42 comes from displaying up to 6 weeks with 7 days each if the month stretches across 6 weeks
  let nextMonthDays = 42 - d3 - d1;
  if (nextMonthDays > 7) {
    nextMonthDays = nextMonthDays - 7;
  }

  for (i = 1; i < nextMonthDays; i++){
    orderedDays.push(nextMonth.clone().date(i));
  }

  return orderedDays;
}


const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class View extends Component {
  constructor(props) {
    super(props);
    this.state = { month: moment().month() };
  }

  onClick = (name) => {
    let { month } = this.state;

    if (name === 'back') {
      if (month === 0) {
        month = 12;
      }
      this.setState({ month: month - 1 });
    } else if (name === 'forward') {
      if (month === 11) {
        month = -1;
      }
      this.setState({ month: month + 1 });
    }
  }

  render() {
    const { lessons, days, teacherId } = this.props;
    const { month } = this.state;
    const beginningOfMonth = moment().clone().month(month).startOf('month');
    const endOfMonth = moment().clone().month(month).endOf('month');

    const daysOfMonth = mapDaysOfMonth(month, beginningOfMonth, endOfMonth);
    return (
      <div>
        <div { ...styles.month }>{ monthNames[month] }</div>
        <button onClick={ () => this.onClick('back') }>Back</button>
        <button onClick={ () => this.onClick('forward') }>Forward</button>
        <table { ...styles.container }>
          {
            dayNames.map((dayName, i) => {
              return <td { ...styles.dayName } key={ i }>{ dayName }</td>
            })
          }
          {
            daysOfMonth.map((day, i) => {
              const stateDay = days.find((d) => {
                return (
                  d.date.day === day.date() &&
                  d.date.month === day.month() + 1 &&
                  d.date.year === day.year()
                );
              });

              let lesson = {};

              if (stateDay) {
                stateDay.lessons.forEach((lessonId) => {
                  lessons.forEach((l) => {
                    if (lessonId === l.id) {
                      lesson = l;
                    }
                  });
                });
              }

              return (
                <Day
                  numericalDate={ day.date() }
                  day={ day }
                  stateDay={ stateDay || {} }
                  key={ day+i }
                  index={ i }
                  lesson={ lesson }
                  beginningOfMonth={ beginningOfMonth }
                  endOfMonth={ endOfMonth }
                  teacherId={ teacherId }
                />
              );
            })
          }
        </table>
      </div>
    );
  }
}

const styles = {
  container: css({
    fontFamily: 'BlinkMacSystemFont',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderRadius: '4px',
    width: '934px',
    height: '700px',
    fontWeight: 100,
    marginLeft: '30px',
    marginBottom: '60px',
    borderRight: `1px solid ${PRIMARY}`,
    borderBottom: `1px solid ${PRIMARY}`,
  }),
  dayName: css({
    display: 'flex',
    fontFamily: 'BlinkMacSystemFont',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '130px',
    height: '30px',
    fontWeight: 100,
    borderLeft: `1px solid ${PRIMARY}`,
    borderTop: `1px solid ${PRIMARY}`,
  }),
  month: css({
    width: '1000px',
    textAlign: 'center'
  }),
}

const mapActionsToProps = {
};

const mapStateToProps = ({ days, lessons }, ownProps) => {
  return {
    teacherId: ownProps.teacherId,
    lessons: Object.values(lessons),
    days: Object.values(days),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(View);
