import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import Button from '../../components/button';
import TextInput from '../../components/text-input';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../palette';

import fetchStudent from '../../actions/fetch-student';

class Landing extends Component {
  onClick = () => {
    const name = this.nameInput.state.text.toLowerCase();
    const pin = this.pinInput.state.text;
    const student = { name: name, pin: pin };
    this.props.fetchStudent(student);
  }

  render() {
    return (
      <div { ...styles.routeContainer }>
        <TextInput ref={(input) => { this.nameInput = input; } } placeholder='first name' style={ styles.input }/>
        <TextInput ref={(input) => { this.pinInput = input; } } placeholder='pin' style={ styles.input }/>
        <Button text="Get Started" onClick={ this.onClick }/>
      </div>
    );
  }
}

const mapActionsToProps = {
  fetchStudent,
};

const mapStateToProps = ({ student }) => ({
  student,
});

const styles = {
  routeContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    flexDirection: 'column',
  }),
  input: {
    width: '250px',
    marginBottom: '20px',
  },
}

export default connect(mapStateToProps, mapActionsToProps)(Landing);
