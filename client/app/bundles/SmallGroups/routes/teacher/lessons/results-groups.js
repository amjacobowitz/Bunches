import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { PRIMARY, SECONDARY } from '../../../palette';

class ResultsGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { submissions, group, students, onClick, params } = this.props;
    return (
      <div { ...styles.group }>
        <div { ...styles.groupName }>{ group.name } </div>
        {
          students.map((student, i) => {
            let studentStyle = styles.student;
            const hasSubmission = submissions.find((submission) => {
              return submission.studentId === student.id && submission.dayId === params.dayId
            })
            if (hasSubmission) {
              studentStyle = styles.studentWithSubmission;
            }

            return (
              <div key={ i } { ...studentStyle }>
                <div onClick={ () => onClick(student, hasSubmission) }>{ student.firstName  }</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const styles = {
  group: css({
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    fontFamily: 'BlinkMacSystemFont',
    width: '15%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: '10px',
    borderRadius: '4px',
    alignItems: 'center'
  }),
  student: css({
  }),
  studentWithSubmission: css({
    color: SECONDARY,
    cursor: 'pointer',
  }),
  groupName: css({
    fontSize: '16px'
  }),
};

const mapActionsToProps = {};

const mapStateToProps = ({
  students,
  submissions
}, ownProps) => {
  const groupStudents = ownProps.group.students.map((studentId) => {
    return students[studentId];
  });

  return {
    students: Object.values(groupStudents),
    submissions: Object.values(submissions)
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ResultsGroup);
