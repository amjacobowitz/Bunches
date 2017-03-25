import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';

import Group from './group';

import addLesson from '../../../actions/add-lesson';
import editLessonAction from '../../../actions/edit-lesson';
import changePath from '../../../actions/change-path';

import { selectAllGroupsInGrouping } from '../../../selectors/groups';

import { PRIMARY, SECONDARY } from '../../../palette';

class LessonCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.editLesson.title || '',
    }
  }

  onClick = (value) => {
    const { title } = this.state;
    const { addLesson, editLessonAction, editLesson, changePath, formType, vineId, groups, teacherId } = this.props;
    let networkRequest = formType === 'edit' ? editLessonAction : addLesson;

    networkRequest(title, vineId, groups, teacherId, editLesson);
    changePath(`/teacher/${teacherId}/lessons`);
  }

  onChange = (value) => {
    const { title } = this.state;
    this.setState({ title: value });
  }

  render() {
    const { formType, groups, vineId } = this.props;
    const groupsDisplay = vineId ?
      groups.map((group, i) => {
        return (
          <Group
            key={ i }
            group={ group }
          />
        )
      }) :
      <div/>

    return (
      <div>
        <TextInput
          value={ this.state.title }
          placeholder="lesson title"
          onChange={ this.onChange }
        />
        <div { ...styles.groupsContainer }>
          <div { ...styles.groups }>
            { groupsDisplay }
          </div>
        </div>
        {
          vineId && (
            <Button
              onClick={ this.onClick }
              text={ formType == 'edit' ? 'save changes' : 'create' }
            />
          )
        }
      </div>
    );
  }
}

const styles = {
  groupsContainer: css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  }),
  title: css({
    fontSize: '30px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginBottom: '8px',
  }),
  subtitle: css({
    fontSize: '18px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginBottom: '20px',
  }),
  groups: css({
    display: 'flex',
    flexWrap: 'wrap',
  }),
  button: css({
    marginTop: '10px',
    height: '30px',
    width: '120px',
    padding: '3px',
  }),
}

const mapActionsToProps = {
  addLesson,
  editLessonAction,
  changePath
};

const mapStateToProps = ({ assignments, groups }, ownProps) => {
  const groupsInGrouping = selectAllGroupsInGrouping(groups, ownProps.vineId);

  return {
    vineId: ownProps.vineId,
    assignments: Object.values(assignments),
    groups: groupsInGrouping,
  };
}

export default connect(mapStateToProps, mapActionsToProps)(LessonCreator);
