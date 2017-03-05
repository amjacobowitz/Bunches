import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import StudentInGroup from './student-in-group';

import { selectAllStudents } from '../../../selectors/students';

class StudentsInGroupList extends Component {
  render() {
    const { group, groupStudents } = this.props;
    return (
      <div { ...styles.list }>
          {
            groupStudents.map((student, i) => {
              return (
                <StudentInGroup
                  key={ i }
                  number={ i + 1 }
                  student={ student }
                />
              )
            })
          }
      </div>
    )
  }
}

const styles = {
  list: css({
    marginTop: '10px',
    overflowY: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    width: '180px',
    maxHeight: '110px',
    minHeight: '110px',
    marginBottom: '20px',
    flex: 0.6,
  }),
}

const mapActionsToProps = {

}

const mapStateToProps = ({ groups, students }, ownProps) => {
  const group = groups[ownProps.groupId];
  const studentIds = group.students;
  const stus = selectAllStudents(students);

  const groupStudents = studentIds.map((studentId) => {
    return stus.filter((student) => {
      return student.id == studentId;
    });
  });

  const listStudents = groupStudents.reduce((a, b) => {
    return a.concat(b);
  }, []);

  return {
    group,
    groupStudents: listStudents
  };
};

export default connect(mapStateToProps, mapActionsToProps)(StudentsInGroupList);
