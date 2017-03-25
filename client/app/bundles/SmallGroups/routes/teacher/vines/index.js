import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Rodal from 'rodal';
require('rodal/lib/rodal.css');

import Vine from './grouping';
import Trash from '../../../components/trash';
import Button from '../../../components/button';

import addVine from '../../../actions/add-grouping';
import fetchTeacher from '../../../actions/fetch-teacher';
import changePath from '../../../actions/change-path';

import { selectAllGroupings } from '../../../selectors/groupings';

import { LIGHT_PRIMARY, WHITE } from '../../../palette';

const plus = require('!!url!./plus.png');

class Vines extends Component {
  constructor(props) {
    super(props);

    if (props.klasses.length === 0) {
      props.fetchTeacher(props.params.id);
    }

    this.state = {
      visible: false,
      title: '',
    };
  }

  onClick = (vineId) => {
    this.props.changePath(`/teacher/${this.props.params.id}/vines/${vineId}`);
  }

  onChange = (e) => {
    this.setState({ title: e.target.value })
  }

  addVine = (e) => {
    e.preventDefault();
    const { params, addVine, vines } = this.props;
    const { title } = this.state;
    const vine = { title };
    const teacherId = params.id;
    this.toggleRodal();

    addVine(vine, teacherId);
  }

  toggleRodal = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { vines, children, params, groups } = this.props;

    const that = this;
    const vinesExist = Object.values(vines).length >= 1;

    return(
      <div { ...styles.routeContainer }>
        <div { ...styles.vinesContainer } >
          <Trash teacherId={ params.id }/>
          <AddVine toggleRodal={ this.toggleRodal } />
          {
            vines.map((vine, i) => {
              return (
                <Vine
                  vine={ vine }
                  selectedVineId={ params.vineId }
                  onClick={ that.onClick }
                  key={ i+vine.id }
                />
              )
            })
          }
        </div>

        {
          !vinesExist && (
            <div { ...styles.noVines }> Create a new vine to get started! </div>
          )
        }

        { children }

        <Rodal
          visible={ this.state.visible }
          height={ 200 }
          onClose={ this.toggleRodal }
        >
          <div { ...styles.newVineTitle }>New Vine</div>
          <form onSubmit={ this.addVine }>
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

function AddVine({ toggleRodal }) {
  return(
    <div { ...styles.addVine } >
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
  vinesContainer: css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  }),
  vines: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  addVine: css({
  }),
  plus: css({
    width: '25px',
    height: '25px',
    cursor: 'pointer',
  }),
  newVine: css({
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
  noVines: css({
    marginTop: '40px',
    fontFamily: 'BlinkMacSystemFont',
    fontSize: '20px',
    fontWeight: 100
  }),
}

const mapActionsToProps = {
  addVine,
  changePath,
  fetchTeacher,
};

const mapStateToProps = ({ groupings, klasses }) => {
  const allVines = selectAllGroupings(groupings);

  return {
    vines: allVines,
    klasses: Object.values(klasses),
  }
};

Vines = DragDropContext(HTML5Backend)(Vines);
export default connect(mapStateToProps, mapActionsToProps)(Vines);
