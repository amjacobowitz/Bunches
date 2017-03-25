import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

class Show extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params, assignments } = this.props;
    return (
      <div>
      </div>
    )
  }
}

const mapActionsToProps = {};

const mapStateToProps = ({
  assignments,
  submissions
}, ownProps) => {
  const assignmentsForLessonOnDay = Object.values(assignments).filter((a) => {
    return a.lessons.includes(ownProps.params.lessonId) && a.days.includes(ownProps.params.dayId);
  });
  return {
    assignments: Object.values(assignmentsForLessonOnDay)
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Show);
