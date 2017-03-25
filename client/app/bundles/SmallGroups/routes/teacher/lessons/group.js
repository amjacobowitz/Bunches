import React, { Component } from 'react';
import { css } from 'glamor';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import {
  WHITE,
  PRIMARY,
  LIGHT_PRIMARY,
  LIGHTEST_PRIMARY,
  SECONDARY,
  GRAY,
  LIGHT_GRAY,
} from '../../../palette';

const groupImg = require('!!url!../vine/group.png');
const goal = require('!!url!../vine/goal.png');

import { selectAllStudents } from '../../../selectors/students';

import addGroupToAssignment from '../../../actions/add-group-to-assignment';
import removeGroupFromAssignment from '../../../actions/remove-group-from-assignment';

import GroupAssignment from './group-assignment';

const groupTarget = {
  drop(props, monitor) {
    const assignment = monitor.getItem();
    props.addGroupToAssignment(props.group, assignment);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class Group extends Component {
  constructor(props) {
    super(props);
  }

  onDoubleClick = () => {
    const { assignment, group } = this.props;
    this.props.removeGroupFromAssignment(assignment.id, group.id);
  }

  render() {
    const {
      group,
      goal,
      students,
      connectDropTarget,
      assignment
    } = this.props;

    return connectDropTarget(
      <div { ...styles.container }>
        <div { ...styles.name } > { group.name || 'no group name' } </div>
        <div { ...styles.goal } > { goal.description || 'no goal' } </div>
        <div { ...styles.studentsList } >
          {
            students.map((student, i) => {
              return (
                <div { ...styles.studentName } key={ student+i }>
                  { `${i+1}) ${student.firstName}` }
                </div>
              );
            })
          }
        </div>
        <div { ...styles.assignment } >
        <GroupAssignment
          assignment={ assignment }
          onDoubleClick={ this.onDoubleClick }
        />
        </div>
        <div { ...styles.studentIcons } >
          <img { ...styles.studentIcon } src={ groupImg }/>
          <div { ...styles.studentNumber }>{ students.length }</div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: css({
    fontFamily: 'BlinkMacSystemFont',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '300px',
    height: '300px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    marginLeft: '30px',
    marginBottom: '30px',
  }),
  name: css({
    flex: 0.1,
  }),
  goal: css({
    flex: 0.2,
  }),
  studentsList: css({
    marginTop: '10px',
    overflowY: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    width: '230px',
    marginBottom: '20px',
    flex: 0.3,
  }),
  assignment: css({
    flex: 0.3,
  }),
  studentIcons: css({
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    marginBottom: '10px',
    marginRight: '40px',
    margin: '5px',
    left: 0,
    flex: 0.1,
  }),
  studentIcon: css({
    marginRight: '5px'
  }),
  studentNumber: css({
    color: LIGHT_GRAY,
  }),
  studentName: css({
    marginLeft: '10px',
    padding: '3px',
  }),
}

const mapActionsToProps = {
  addGroupToAssignment,
  removeGroupFromAssignment
};

const mapStateToProps = ({ assignments, groups, students, goals }, ownProps) => {
  const group = groups[ownProps.group.id];
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

  const goal = goals[group.goalId];

  const assignment = assignments[group.assignmentId];

  return {
    group: group,
    goal: goal || {},
    students: listStudents,
    assignment: assignment || {}
  };
};

Group = DropTarget('assignment', groupTarget, collect)(Group);
export default connect(mapStateToProps, mapActionsToProps)(Group);
