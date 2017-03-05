import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
require('rodal/lib/rodal.css');

import selectDate from '../../../actions/select-date';
import addAssignment from '../../../actions/add-assignment';
import fetchTeacher from '../../../actions/fetch-teacher';

import TextArea from '../../../components/textarea';
import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';
import Trash from '../../../components/trash';

import Assignment from './assignment';
import LessonCreator from './lesson-creator';
import Grouping from '../groups/grouping';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../../palette';

function checkGroupingId(groupings) {
  if (groupings.length > 1) {
    const groupingId = groupings[0].id;
    return groupingId;
  }

  return '';
}

class NewLesson extends Component {
  constructor(props) {
    super(props);

    if (props.klasses.length === 0) {
      props.fetchTeacher(props.params.id);
    }

    this.state = {
      visible: false,
      title: '',
      directions: '',
      groupingId: checkGroupingId(props.groupings),
      selectedGroupingIndex: '',
      assignment: {},
      showAssignment: false,
    };
  }

  onClick = (value, name) => {
    const teacherId = this.props.params.id;
    if (name === 'create') {
      const { title, directions } = this.state;
      const assignment = { title, directions };
      this.props.addAssignment(assignment, teacherId);
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

  onGroupingClick = (groupingId, index) => {
    this.setState({
      groupingId: groupingId,
      selectedGroupingIndex: index
    });
  }

  onChange = (value, type) => {
    this.setState({ [type]: value });
  }

  toggleRodal = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { groups, assignments, groupings, params } = this.props;
    const { assignment, directions, title, groupingId, showAssignment } = this.state;

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
                  <Assignment
                    key={ assignment.id+i }
                    assignment={ assignment }
                    onMouseEnter={ this.onMouseEnter }
                    onMouseLeave={ this.onMouseLeave }
                  />
                )
              })
            }
          </div>
        </div>
        <div { ...styles.lessonArea }>
          <div { ...styles.groupingsContainer }>
            {
              groupings.map((gp, i) => {
                const selected = this.state.selectedGroupingIndex === i;

                return (
                  <Grouping
                    grouping={ gp }
                    onClick={ this.onGroupingClick }
                    selected={ selected }
                    key={ i+gp }
                    index={ i }
                  />
                )
              })
            }
          </div>
          <div { ...styles.lessonCreatorContainer }>
            <LessonCreator
              groupingId={ groupingId }
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
              heading='New Assignment'
            />
            <TextInput
              onChange={ (value) => this.onChange(value, 'title') }
              placeholder='title'
            />

            <TextArea
              onChange={ (value) => this.onChange(value, 'directions') }
              value={ '' }
              placeholder="directions: "
            />
            <Button
              disabled={ createButtonDisabled }
              onClick={ (e) => this.onClick(e.target.value, 'create') }
              text='create'
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
  sidebar: css({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '-90px',
    paddingRight: '20px',
    borderRight: `1px solid ${PRIMARY}`,
  }),
  groupingsContainer: css({
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
  fetchTeacher
};

const mapStateToProps = ({
  assignments,
  groups,
  klasses,
  groupings
}) => ({
  assignments: Object.values(assignments),
  groups: Object.values(groups),
  klasses: Object.values(klasses),
  groupings: Object.values(groupings),
});

NewLesson = DragDropContext(HTML5Backend)(NewLesson);
export default connect(mapStateToProps, mapActionsToProps)(NewLesson);
