import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import Button from '../../components/button';
import TextInput from '../../components/text-input';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../palette';

import authStudent from '../../actions/auth-student';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', pin: '' };
  }

  onChange = (value, name) => {
    if (name == 'name') {
      this.setState({ name: value });
    } else {
      this.setState({ pin: value });
    }
  }

  onClick = () => {
    const { name, pin } = this.state;
    const student = { name: name.toLowerCase(), pin: pin };
    this.props.authStudent(student);
  }

  render() {
    return (
      <div { ...styles.routeContainer }>
        <TextInput
          name='name'
          onChange={ this.onChange }
          placeholder='first name'
          style={ styles.input }
        />
        <TextInput
          name='pin'
          onChange={ this.onChange }
          placeholder='pin'
          style={ styles.input }
        />
        <Button
          text="Get Started"
          disabled={ !this.state.name || !this.state.pin }
          onClick={ this.onClick }
        />
      </div>
    );
  }
}

const mapActionsToProps = {
  authStudent,
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
