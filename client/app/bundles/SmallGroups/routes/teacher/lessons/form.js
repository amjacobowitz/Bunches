import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
require('rodal/lib/rodal.css');

import selectDate from '../../../actions/select-date';
import addAssignment from '../../../actions/add-assignment';
import editAssignment from '../../../actions/edit-assignment';
import fetchTeacher from '../../../actions/fetch-teacher';

import TextArea from '../../../components/textarea';
import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';
import Trash from '../../../components/trash';

import Assignment from './assignment';
import LessonCreator from './lesson-creator';
import Vine from '../vines/grouping';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../../palette';

class Form extends Component {
  constructor(props) {
    super(props);

    if (props.klasses.length === 0) {
      props.fetchTeacher(props.params.id);
    }

    this.state = {
      visible: false,
      title: '',
      directions: '',
      editingAssignmentId: '',
      assignment: {},
      vineId: props.editLesson.vineId || '',
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

  onMouseEnter = (assignmentId) => {
    const { assignments } = this.props;
    const assignment = assignments.find((assignment) => assignment.id === assignmentId);
    this.setState({ assignment, showAssignment: true });
  }

  onMouseLeave = () => {
    this.setState({ assignment: {}, showAssignment: false });
  }

  onVineClick = (value) => {
    this.setState({ vineId: value });
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
    const { groups, assignments, vines, params, formType, editLesson } = this.props;
    const { assignment, directions, title, showAssignment, vineId, editingAssignmentId } = this.state;
    const createButtonDisabled = !directions || !title;
    return(
      <div { ...styles.routeContainer }>
        <div { ...styles.sidebar }>
          <Trash teacherId={ params.id }/>
          Assignments
          <Button
            onClick={ this.toggleRodal }
            text='new'
            style={ styles.button }
            textStyle={ styles.buttonText }
          />
          <div { ...styles.assignmentsContainer }>
            {
              assignments.map((assignment, i) => {
                return (
                  <div
                    key={ assignment.id+i }
                    onClick={ () => this.onClick(assignment, 'editOpen') }
                  >
                    <Assignment
                      assignment={ assignment }
                      onMouseEnter={ this.onMouseEnter }
                      onMouseLeave={ this.onMouseLeave }
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div { ...styles.lessonArea }>
          <Heading heading={ formType === 'edit' ? 'editing lesson' : 'new lesson' } />
          <div { ...styles.vinesContainer }>
            {
              vines.map((vine, i) => {
                return (
                  <Vine
                    vine={ vine }
                    onClick={ this.onVineClick }
                    selectedVineId={ vineId }
                    key={ i+vine.id }
                  />
                )
              })
            }
          </div>
          <div { ...styles.lessonCreatorContainer }>
            <LessonCreator
              teacherId={ params.id }
              vineId={ vineId }
              formType={ formType }
              editLesson={ editLesson || {} }
            />
          </div>
        </div>
        {
          showAssignment && (
            <div { ...styles.assignmentView }>
              <div>{ assignment.title }</div>
              <div>{ assignment.directions }</div>
            </div>
          )
        }
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
    );
  }
}

const styles = {
  routeContainer: css({
    display: 'flex',
    textAlign: 'center',
  }),
  margin: css({
    marginTop: '20px',
  }),
  sidebar: css({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '-90px',
    paddingRight: '20px',
    borderRight: `1px solid ${PRIMARY}`,
  }),
  vinesContainer: css({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  }),
  assignmentsContainer: css({
    display: 'flex',
    justifyCOntent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
  }),
  newAssignmentContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 350,
    marginTop: '20px',
  }),
  lessonCreatorContainer: css({
    display: 'flex',
    justifyContent: 'center',
    width: '1000px',
  }),
  lessonArea: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  assignmentView: css({
    zIndex: 999,
    position: 'absolute',
    border: `1px solid ${PRIMARY}`,
    marginLeft: '100px',
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    backgroundColor: WHITE,
    padding: '10px',
  }),
}

const mapActionsToProps = {
  selectDate,
  addAssignment,
  editAssignment,
  fetchTeacher
};

const mapStateToProps = ({
  assignments,
  groups,
  klasses,
  groupings,
  lessons,
}, ownProps) => {
  return {
    assignments: Object.values(assignments),
    groups: Object.values(groups),
    klasses: Object.values(klasses),
    vines: Object.values(groupings),
    editLesson: lessons[ownProps.params.lessonId] || {}
  }
};

Form = DragDropContext(HTML5Backend)(Form);
export default connect(mapStateToProps, mapActionsToProps)(Form);
