import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import Rodal from 'rodal';
require('rodal/lib/rodal.css');

import changeDirections from '../../../actions/change-directions';
import changeTitle from '../../../actions/change-title';
import selectDate from '../../../actions/select-date';
import addAssignment from '../../../actions/add-assignment';

import TextArea from '../../../components/textarea';
import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';

import Assigner from './assigner';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../../palette';

class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onClick = (value, name) => {
    const teacherId = this.props.params.id;
    if (name === 'create') {
      this.props.addAssignment(teacherId);
      this.toggleRodal();
    }
  }

  onSelect = (date) => {

  }

  onChange = (value) => {
    this.props.changeDirections(value);
  }

  onTitleChange = (value) => {
    this.props.changeTitle(value);
  }

  toggleRodal = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { assignment, groups } = this.props;
    const createButtonDisabled = !assignment.directions || !assignment.title;

    return(
      <div { ...styles.routeContainer }>
        <div { ...styles.sidebar }>
          <div { ...styles.buttonContainer }>
            <Button
              onClick={ this.toggleRodal }
              text='new'
            />
          </div>
        </div>
        <div { ...styles.assignerContainer }>
          <Assigner
            assignment={ assignment }
            groups={ groups }
          />
        </div>
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
              onChange={ this.onTitleChange }
              placeholder='title'
            />

            <TextArea
              onChange={ this.onChange }
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

const mapActionsToProps = {
  changeDirections,
  changeTitle,
  selectDate,
  addAssignment
};

const mapStateToProps = ({
  assignment,
  groups
}) => ({
  assignment,
  groups
});

const styles = {
  routeContainer: css({
    display: 'flex',
    textAlign: 'center',
  }),
  sidebar: css({
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    borderRight: `1px solid ${PRIMARY}`,
    height: '75vh',
    marginLeft: '-150px',
  }),
  buttonContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  newAssignmentContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 350,
    marginTop: '20px',
  }),
  assignerContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '850px',
  })
}

export default connect(mapStateToProps, mapActionsToProps)(Assignments);
