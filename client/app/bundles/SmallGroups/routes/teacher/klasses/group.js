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

const close = require('!!url!./close.png');
const closeRed = require('!!url!./close-red.png');
const groupImg = require('!!url!./group.png');
const goal = require('!!url!./goal.png');

import StudentsInGroupList from './students-in-group-list';
import GoalDisplay from './goal-display';
import addGoalToStudents from '../../../actions/add-goal-to-students';

const groupTarget = {
  drop(props, monitor) {
    const student = monitor.getItem();
    if(props.group.id !== student.groupId) {
      props.addStudentToGroup(
        student,
        props.group,
        props.teacherId,
      );
    }
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
    this.state = {
      name: '',
      nameOpen: true,
      description: '',
      goalOpen: true,
      showGoal: false,
    }
  }

  onSubmit = (e, source) => {
    e.preventDefault();
    const { name, nameOpen, goalOpen, description } = this.state;
    const { addGoalToStudents, group } = this.props;

    if (source === 'name') {
      if (name.length > 0) {
        this.setState({ nameOpen: !nameOpen });
      }
    } else if(source === 'description') {
      if (description.length > 0) {
        this.setState({ goalOpen: !goalOpen });
        addGoalToStudents(description, group);
      }
    }
  }

  onChange = (e, source) => {
    if (source === 'name') {
      this.setState({ name: e.target.value });
    } else if(source === 'description') {
      this.setState({ description: e.target.value });
    }
  }

  onClick = (source) => {
    if (source === 'name') {
      this.setState({ nameOpen: !this.state.nameOpen });
    } else if(source === 'description') {
      this.setState({ goalOpen: !this.state.goalOpen });
    }
  }

  toggleGoal = () => {
    this.setState({ showGoal: !this.state.showGoal });
  }

  render() {
    const { showGoal, group, connectDropTarget, isOver, item, removeGroup } = this.props;

    const name = this.state.nameOpen ?
                  <input
                    { ...styles.input }
                    onChange={ (e) => this.onChange(e, 'name') }
                    value={ this.state.name }
                  /> :
                  <div
                    { ...styles.title }
                    onClick={ () => this.onClick('name') }>
                    { this.state.name }
                  </div>

    const displayOption = showGoal ?
                          <GoalDisplay
                            goalOpen={ this.state.goalOpen }
                            description={ this.state.description }
                            onChange={ this.onChange }
                            onClick={ this.onClick }
                            onSubmit={ this.onSubmit }
                          />:
                          <StudentsInGroupList groupId={ group.id }/>
    return connectDropTarget(
      <div { ...styles.container }>
        <div { ...styles.closeContainer }>
          <div { ...styles.close }  onClick={ () => removeGroup(group) } />
        </div>
        <form { ...styles.nameForm } onSubmit={ (e) => this.onSubmit(e, 'name') }>
          { name }
        </form>
        { displayOption }
        <div { ...styles.studentIcons } >
          <img { ...styles.studentIcon } src={ groupImg }/>
          <div { ...styles.studentNumber }>{ group.students.length }</div>
        </div>
        <div
          onMouseOver={ this.toggleGoal }
          onMouseOut={ this.toggleGoal }
        >
        </div>
      </div>
    );
  }
}

const styles = {
  container: css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '200px',
    height: '200px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    marginRight: '10px',
    marginBottom: '10px',
  }),
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
  nameContainer: css({
    padding: '3px',
    width: '80px',
  }),
  nameForm: css({
    flex: 0.1,
  }),
  input: css({
    cursor: 'pointer',
    fontWeight: 100,
    textAlign: 'center',
    fontSize: '20px',
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #ddd',
    height: '15px',
    width: '130px',
  }),
  title: css({
    fontSize: '20px',
    fontWeight: 200,
    fontFamily: 'BlinkMacSystemFont',
    cursor: 'pointer',
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
  goalIcon: css({
    position: 'absolute',
    bottom: 0,
    display: 'flex',
      margin: '5px',
      right: 0,
      cursor: 'pointer'
  }),
  studentNumber: css({
    color: LIGHT_GRAY,
  }),
  closeContainer: css({
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    cursor: 'pointer',
  }),
  close: css({
    marginRight: '5px',
    marginTop: '5px',
    backgroundImage: `url(${ close })`,
    width: '20px',
    height: '20px',
    ':hover': {
      backgroundImage: `url(${ closeRed })`,
    }
  })
}

const mapActionsToProps = {
  addGoalToStudents,
}

const mapStateToProps = ({}) => ({

});

Group = DropTarget('student', groupTarget, collect)(Group);
export default connect(mapStateToProps, mapActionsToProps)(Group);
