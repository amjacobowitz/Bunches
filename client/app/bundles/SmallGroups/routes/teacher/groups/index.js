import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Rodal from 'rodal';
require('rodal/lib/rodal.css');

import Grouper from './grouper'
import Grouping from './grouping';
import Trash from '../../../components/trash';
import Button from '../../../components/button';

import addGrouping from '../../../actions/add-grouping';
import fetchTeacher from '../../../actions/fetch-teacher';

import { selectAllStudents } from '../../../selectors/students';
import { selectAllGroupings } from '../../../selectors/groupings';

import { LIGHT_PRIMARY, WHITE } from '../../../palette';

const plus = require('!!url!./plus.png');

function checkGroupingId(groupings) {
  if (groupings.length > 1) {
    const groupingId = groupings[0].id;
    return groupingId;
  }

  return '';
}

class Groups extends Component {
  constructor(props) {
    super(props);

    if (props.klasses.length === 0) {
      props.fetchTeacher(props.params.id);
    }

    this.state = {
      visible: false,
      title: '',
      groupingId: checkGroupingId(props.groupings),
      selectedGroupingIndex: 0
    };
  }

  onClick = (groupingId, index) => {
    this.setState({
      groupingId: groupingId,
      selectedGroupingIndex: index
    });
  }

  onChange = (e) => {
    this.setState({ title: e.target.value })
  }

  addGrouping = (e) => {
    e.preventDefault();
    const { params, addGrouping, groupings } = this.props;
    const { title } = this.state;

    const grouping = { title };
    const teacherId = params.id;
    this.toggleRodal();

    addGrouping(grouping, teacherId)
    .then((groupingId) => {
      this.setState({
        title: '',
        groupingId: groupingId,
        selectedGroupingIndex: groupings.length
      });
    });
  }

  toggleRodal = () => {
    this.setState({ visible: !this.state.visible })
  }

  setGroupingId = (groupingId) => {
    this.setState({ groupingId: groupingId });
  }

  render() {
    const { groupings, params, groups, students } = this.props;
    const { groupingId } = this.state;
    const that = this;
    const groupingsExist = Object.values(groupings).length >= 1;

    return(
      <div { ...styles.routeContainer }>
        <div { ...styles.groupingsContainer } >
          <Trash teacherId={ params.id }/>
          <AddGrouping toggleRodal={ this.toggleRodal } />
          {
            groupings.map((gp, i) => {
              const selected = this.state.selectedGroupingIndex == i;
              return (
                <Grouping
                  grouping={ gp }
                  onClick={ that.onClick }
                  selected={ selected }
                  key={ i+gp }
                  index={ i }
                />
              )
            })
          }
        </div>

        {
          groupingsExist && (
            <Grouper
              id={ params.id }
              groupingId={ groupingId }
              setGroupingId={ this.setGroupingId }
            />
          )
        }

        {
          !groupingsExist && (
            <div { ...styles.noGroupings }> Create a new grouping to get started! </div>
          )
        }

        <Rodal
          visible={ this.state.visible }
          height={ 200 }
          onClose={ this.toggleRodal }
        >
          <div { ...styles.newGroupingTitle }>New Grouping</div>
          <form onSubmit={ this.addGrouping }>
            <input
              { ...styles.input }
              value={ this.state.title }
              placeholder='title'
              onChange={ (e) => this.onChange(e) }
            />
            <Button
              disabled={ !this.state.title }
              style={ { } }
              text='create'
            />
          </form>
        </Rodal>
      </div>
    );
  }
}

function AddGrouping({ toggleRodal }) {
  return(
    <div { ...styles.addGrouping } >
      <img { ...styles.plus } onClick={ toggleRodal } src={ plus } />
    </div>
  )
}

const styles = {
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  }),
  groupingsContainer: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  }),
  groupings: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  addGrouping: css({
  }),
  plus: css({
    width: '25px',
    height: '25px',
    cursor: 'pointer',
  }),
  newGroupingTitle: css({
    fontSize: '20px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginBottom: '20px',
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
  noGroupings: css({
    marginTop: '40px',
    fontFamily: 'BlinkMacSystemFont',
    fontSize: '20px',
    fontWeight: 100
  }),
}

const mapActionsToProps = {
  addGrouping,
  fetchTeacher,
};

const mapStateToProps = ({ groupings, students, klasses }) => {
  const allStudents = selectAllStudents(students);
  const allGroupings = selectAllGroupings(groupings);

  return {
    groupings: allGroupings,
    students: allStudents,
    klasses: Object.values(klasses),
  }
};

Groups = DragDropContext(HTML5Backend)(Groups);
export default connect(mapStateToProps, mapActionsToProps)(Groups);
