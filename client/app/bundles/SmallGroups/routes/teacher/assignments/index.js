import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Rodal from 'rodal';

import fetchTeacher from '../../../actions/fetch-teacher';
import changePath from '../../../actions/change-path';
import addAssignment from '../../../actions/add-assignment';
import editAssignment from '../../../actions/edit-assignment';
import removeAssignment from '../../../actions/remove-assignment';

import TextArea from '../../../components/textarea';
import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';

import { PRIMARY, LIGHT_GRAY, BLACK, LIGHT_PRIMARY, WHITE } from '../../../palette';

const close = require('!!url!../vine/close.png');
const closeRed = require('!!url!../vine/close-red.png');

class Assignments extends Component {
  constructor(props) {
    super(props);
    if (props.assignments.length === 0) {
      props.fetchTeacher(props.params.id);
    }

    this.state = {
      visible: false,
      title: '',
      directions: '',
      editingAssignmentId: '',
      assignment: {},
      showAssignment: false,
    };

  }

  onClick = (value, name) => {
    const { params: { id }, editAssignment, addAssignment } = this.props;
    const { title, directions, editingAssignmentId } = this.state;
    if (name === 'editOpen') {
      this.setState({
        visible: !this.state.visible,
        title: value.title,
        directions: value.directions,
        editingAssignmentId: value.id
      })
    } else {
      const assignmentFunction = name === 'edit' ? editAssignment : addAssignment;
      const assignment = { title, directions };
      assignmentFunction(assignment, id, editingAssignmentId);
      this.toggleRodal();
    }
  }

  onChange = (value, type) => {
    this.setState({ [type]: value });
  }

  toggleRodal = () => {
    this.setState({
      visible: !this.state.visible,
      title: '',
      directions: '',
      editingAssignmentId: '',
    });
  }


  render() {
    const { assignments, params, editAssignment } = this.props;
    const { assignment, directions, title, showAssignment, editingAssignmentId } = this.state;

    const createButtonDisabled = !directions || !title;

    return (
      <div { ...styles.routeContainer }>
        <Heading heading="assignments" />

        <Button
          onClick={ this.toggleRodal }
          text='new'
          style={ styles.button }
          textStyle={ styles.buttonText }
        />
        <div { ...styles.assignmentsContainer }>

          {
            assignments.map((assignment) => {
              return (
                <div key={ assignment.id } { ...styles.assignment }>
                  <div { ...styles.closeContainer }>
                    <div { ...styles.close }  onClick={ () => this.props.removeAssignment(assignment, params.id) } />
                  </div>
                  <div>{ assignment.title }</div>
                </div>
              )
            })
          }
        </div>
        <Rodal
          visible={ this.state.visible }
          height={ 400 }
          onClose={ this.toggleRodal }
        >
          <div { ...styles.newAssignmentContainer }>
            <Heading
              heading={ editingAssignmentId ? 'Edit Assignment' : 'New Assignment' }
            />

            <TextInput
              onChange={ (value) => this.onChange(value, 'title') }
              value={ this.state.title }
              placeholder='title'
            />

            <TextArea
              onChange={ (value) => this.onChange(value, 'directions') }
              value={ this.state.directions }
              placeholder="directions: "
            />

            <div { ...styles.margin }/>

            <Button
              disabled={ createButtonDisabled }
              onClick={ (e) => this.onClick(e.target.value, editingAssignmentId ? 'edit' : 'create') }
              text={ editingAssignmentId ? 'edit' : 'new' }
            />
          </div>
        </Rodal>

      </div>
    )
  }
}

const styles = {
  newAssignmentContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 350,
    marginTop: '20px',
  }),
  margin: css({
    marginTop: '20px',
  }),
  button: css({
    marginTop: '10px',
    height: '30px',
    width: '120px',
    padding: '3px',
  }),
  buttonText: css({
    fontSize: '14px'
  }),
  routeContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    textAlign: 'center',
  }),
  assignment: css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '180px',
    height: '180px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    marginRight: '10px',
    marginBottom: '10px',
    fontFamily: 'BlinkMacSystemFont'
  }),
  title: css({
    fontSize: '18px',
  }),
  assignmentsContainer: css({
    marginTop: '20px',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
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
  }),
  closeContainer: css({
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: '5px',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    cursor: 'pointer',
  }),
};

const mapActionsToProps = {
  fetchTeacher,
  changePath,
  addAssignment,
  editAssignment,
  removeAssignment,
};

const mapStateToProps = ({ assignments }) => ({
  assignments: Object.values(assignments)
});

export default connect(mapStateToProps, mapActionsToProps)(Assignments);
