import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import TextArea from '../../../components/textarea';
import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';

import Group from './group';

import { selectAllGroupsInGrouping } from '../../../selectors/groups';

import { PRIMARY, SECONDARY } from '../../../palette';

class LessonCreator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { groups, groupingId } = this.props;
    const groupsDisplay = groupingId ?
      groups.map((group, i) => {
        return (
          <Group
            key={ i }
            group={ group }
            groupingId={ groupingId }
          />
        )
      }) :
      <Heading
        heading='select a grouping for the lesson'
      />

    return (
      <div>
        <div { ...styles.groupsContainer }>
          <div { ...styles.groups }>
            { groupsDisplay }
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  groupsContainer: css({
    display: 'flex',
    flexDirection: 'column',
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
}

const mapActionsToProps = {

};

const mapStateToProps = ({ assignments, groups }, ownProps) => {
  const groupsInGrouping = selectAllGroupsInGrouping(groups, ownProps.groupingId);

  return {
    groupingId: ownProps.groupingId,
    assignments: Object.values(assignments),
    groups: groupsInGrouping,
  };
}

export default connect(mapStateToProps, mapActionsToProps)(LessonCreator);
