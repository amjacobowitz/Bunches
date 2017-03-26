import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import ResultsGroup from './results-groups';
import SubmissionViewPort from './submission-view-port';
import fetchTeacher from '../../../actions/fetch-teacher';

class Show extends Component {
  constructor(props) {
    super(props);
    if (props.groups.length === 0) {
      props.fetchTeacher(props.params.id);
    }
    this.state = { selectedStudents: [] }
  }

  selectStudent = (student, hasSubmission) => {
    const { selectedStudents } = this.state;
    const editing = selectedStudents.find((s) => s.id === student.id);
    if (hasSubmission && !editing) {
      this.setState({ selectedStudents: selectedStudents.concat(student) });
    }
  }

  removeEditor = (removeStudent) => {
    const selectedStudents = this.state.selectedStudents.filter((student) => student.id != removeStudent.id );
    this.setState({ selectedStudents });
  }

  render() {
    const { groups, params } = this.props;
    return (
      <div { ...styles.routeContainer }>
        <div { ...styles.groupsContainer }>
          {
            groups.map((group, i) => {
              return (
                <ResultsGroup
                  onClick={ this.selectStudent }
                  key={ group.id+i }
                  group={ group }
                  params={ params }
                />
              )
            })
          }
        </div>

        <SubmissionViewPort
          students={ this.state.selectedStudents }
          removeEditor={ this.removeEditor }
          params={ params }
        />
      </div>
    )
  }
}

const styles = {
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  groupsContainer: css({
    display: 'flex',
    minHeight: '100px',
    justifyContent: 'center'
  }),
};

const mapActionsToProps = {
  fetchTeacher
};

const mapStateToProps = ({
  groupings,
  groups,
  lessons,
}, ownProps) => {
  const lesson = lessons[ownProps.params.lessonId] || {};
  let lessonGroups = {};

  if (Object.keys(lesson).length != 0) {
    let grouping = groupings[lesson.vineId];
    lessonGroups = grouping.groups.map((groupId) => {
      return groups[groupId];
    });
  }

  return {
    groups: Object.values(lessonGroups)
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Show);
