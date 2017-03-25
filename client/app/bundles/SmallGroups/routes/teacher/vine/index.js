import React, { Component } from 'react';
import { css } from 'glamor';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Rodal from 'rodal';
require('rodal/lib/rodal.css');
import ToggleButton from 'react-toggle-button';

import Student from './student';
import Group from './group';
import Button from '../../../components/button';

import addStudent from '../../../actions/add-student';
import removeStudent from '../../../actions/remove-student';
import addGroup from '../../../actions/add-group';
import removeGroup from '../../../actions/remove-group';
import addStudentToGroup from '../../../actions/add-student-to-group';
import removeStudentFromGroup from '../../../actions/remove-student-from-group';

import { selectStudentsWithoutGroupsInGrouping } from '../../../selectors/students';
import { selectAllGroupsInGrouping } from '../../../selectors/groups';

import { PRIMARY, SECONDARY, GRAY } from '../../../palette';

const plus = require('!!url!../vines/plus.png');

class Vine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      firstName: '',
      lastName: '',
      showGoals: false
    };
  }

  addStudent = (e) => {
    e.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const student = { firstName, lastName };
    const teacherId = this.props.params.id;

    this.toggleRodal();
    this.props.addStudent(student, teacherId);
    this.setState({ firstName: '', lastName: '' });
  }

  toggleGoals = () => {
    this.setState({ showGoals: !this.state.showGoals });
  }

  toggleRodal = () => {
    this.setState({ visible: !this.state.visible })
  }

  removeStudent = (student) => {
    this.props.removeStudent(student);
  }

  addGroup = () => {
    const { params } = this.props;
    this.props.addGroup(params.vineId);
  }

  removeGroup = (group) => {
    this.props.removeGroup(group)
  }

  addStudentToGroup = (student, group) => {
    const teacherId = this.props.id;
    this.props.addStudentToGroup(student, group, teacherId);
  }

  onChange = (e, label) => {
    this.setState({ [label]: e.target.value })
  }

  render() {
    const { students, groups, params } = this.props;
    const studentsExist = students.length > 0;

    return(
      <div { ...styles.container }>
        <div { ...styles.students }>
          <div { ...styles.title }>Students</div>
          <div { ...styles.subtitle }>{ students.length }</div>
          <div { ...styles.studentList }>
            {
               studentsExist && (
                students.map((student, i) => {
                  return (
                    <Student
                      key={ i }
                      student={ student }
                    />
                 )
                })
              )
            }
          </div>
          <AddStudent toggleRodal={ this.toggleRodal }/>
        </div>
        <div { ...styles.groupsContainer }>
          <div { ...styles.goalToggle }>
            <ToggleButton
              inactiveLabel={ '' }
              activeLabel={ '' }
              colors={{
                activeThumb: {
                  base: SECONDARY,
                },
                inactiveThumb: {
                  base: PRIMARY,
                },
              }}
              thumbAnimateRange={[0, 36]}
              value={ this.state.showGoals }
              onToggle={(value) => {
                this.setState({ showGoals: !this.state.showGoals })
              }}
            />
          </div>
          <div { ...styles.title }>Groups</div>
          <div { ...styles.subtitle }>{ groups.length }</div>
          <div { ...styles.groups }>
            {
              groups.map((group, i) => {
                return (
                  <Group
                    key={ i }
                    group={ group }
                    showGoal={ this.state.showGoals }
                    removeGroup={ this.removeGroup }
                    addStudentToGroup={ this.addStudentToGroup }
                    groupingId={ params.vineId }
                  />
                )
              })
            }
            <AddGroup addGroup={ this.addGroup }/>
          </div>
        </div>
        <Rodal
          visible={ this.state.visible }
          height={ 200 }
          onClose={ this.toggleRodal }
        >
          <div { ...styles.newStudentTitle }>New Student</div>
          <form onSubmit={ this.addStudent }>
            <input
              { ...styles.input }
              value={ this.state.firstName }
              placeholder='first name'
              onChange={ (e) => this.onChange(e, 'firstName') }
            />
            <input
              { ...styles.input }
              value={ this.state.lastName }
              placeholder='last name'
              onChange={ (e) => this.onChange(e, 'lastName') }
            />
            <Button
              disabled={ !this.state.lastName || !this.state.firstName }
              style={ { } }
              text='add'
            />
          </form>
        </Rodal>
      </div>
    );
  }
}

//Add a group without a title.  When saving title, save group again.
function AddGroup({ addGroup }) {
  return (
    <div { ...styles.addGroup }>
      <img { ...styles.bigPlus } onClick={ addGroup } src={ plus } />
    </div>
  )
}

//Pop up a modal, then add student to DB when closing
function AddStudent({ toggleRodal }) {
  return (
    <div { ...styles.addStudent }>
      <img { ...styles.plus } onClick={ toggleRodal } src={ plus } />
    </div>
  )
}

const styles = {
  container: css({
    display: 'flex',
    textAlign: 'center',
  }),
  title: css({
    fontSize: '30px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginBottom: '8px',
  }),
  newStudentTitle: css({
    fontSize: '20px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginBottom: '20px',
  }),
  subtitle: css({
    fontSize: '18px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginBottom: '20px',
  }),
  students: css({
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
  }),
  groupsContainer: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  groupHeading: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  groups: css({
    width: '640px',
    display: 'flex',
    flexWrap: 'wrap',
  }),
  addGroup: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '200px',
    height: '200px',
    fontWeight: 100,
    border: `1px dashed ${GRAY}`,
    marginBottom: '50px'
  }),
  addStudent: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    border: `1px dashed ${GRAY}`,
    margin: '10px',
  }),
  bigPlus: css({
    cursor: 'pointer'
  }),
  plus: css({
    width: '25px',
    height: '25px',
    cursor: 'pointer',
  }),
  input: css({
    fontWeight: 100,
    textAlign: 'center',
    fontSize: '20px',
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #ddd',
    width: '80%',
    marginBottom: '20px'
  }),
  goalToggle: css({
    position: 'absolute',
    right: 300
  }),
  studentList: css({
    display: 'flex',
    flexWrap: 'wrap'
  }),
}

const mapStateToProps = ({ groupings, students, groups }, ownProps ) => {
  const vineId = ownProps.params.vineId;
  const groupsInGrouping = selectAllGroupsInGrouping(groups, vineId);

  return {
    groups: groupsInGrouping,
    students: selectStudentsWithoutGroupsInGrouping(students, groups, vineId),
    groupings,
  }
};

const mapActionsToProps = {
  addStudent,
  removeStudent,
  addGroup,
  removeGroup,
  addStudentToGroup,
  removeStudentFromGroup,
};

export default connect(mapStateToProps, mapActionsToProps)(Vine);
