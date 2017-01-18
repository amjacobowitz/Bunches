import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import Rodal from 'rodal';
require('rodal/lib/rodal.css');

import Grouper from './grouper'
import Grouping from './grouping';
import Button from '../../../components/button';

import addGrouping from '../../../actions/add-grouping';

import { selectAllStudents } from '../../../selectors/students';
import { selectAllGroupings } from '../../../selectors/groupings';

import { LIGHT_PRIMARY, WHITE } from '../../../palette';

const plus = require('!!url!./plus.png');

class Klasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      groupingId: '',
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
    const title = this.state.title;
    const grouping = { title };
    const teacherId = this.props.params.id;
    this.toggleRodal();
    this.props.addGrouping(grouping, teacherId);
    this.setState({ title: '', groups: [] });
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
          <AddGrouping toggleRodal={ this.toggleRodal } />
          {
            groupings.map((gp, i) => {
              const selected = this.state.selectedGroupingIndex == i;
              return (
                <Grouping
                  grouping={ gp }
                  onClick={ that.onClick }
                  selected={ selected }
                  key={ i }
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
  addGrouping
};

const mapStateToProps = ({ groupings, students }) => {
  const allStudents = selectAllStudents(students);
  const allGroupings = selectAllGroupings(groupings)

   return {
    groupings: allGroupings,
    students: allStudents,
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Klasses);
