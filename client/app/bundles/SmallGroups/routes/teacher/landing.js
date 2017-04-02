import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import Button from '../../components/button';
import TextInput from '../../components/text-input';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../palette';

import authTeacher from '../../actions/auth-teacher';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  onChange = (value, name) => {
    if (name == 'email') {
      this.setState({ email: value });
    } else {
      this.setState({ password: value });
    }
  }

  onClick = () => {
    const { email, password } = this.state;
    const teacher = { email: email.toLowerCase(), password: password };
    this.props.authTeacher(teacher);
  }

  render() {
    return (
      <div { ...styles.routeContainer }>
        <div style={ styles.title }>Teacher Portal</div>
        <TextInput
          name={'email'}
          onChange={ (value) => this.onChange(value, 'email') }
          placeholder='email'
          style={ styles.input }
          value={ this.state.email }
        />
        <TextInput
          name={'password'}
          onChange={ (value) => this.onChange(value, 'password') }
          placeholder='password'
          style={ styles.input }
          value={ this.state.password }
        />
        <Button
          text="login"
          disabled={ !this.state.email || !this.state.password }
          onClick={ this.onClick }
        />
      </div>
    );
  }
}

const mapActionsToProps = {
  authTeacher,
};

const mapStateToProps = ({ teacher }) => ({
  teacher,
});

const styles = {
  routeContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    flexDirection: 'column',
  }),
  input: {
    width: '250px',
    marginBottom: '20px',
  },
  title: {
    fontFamily: 'BlinkMacSystemFont',
    fontWeight: 100,
    fontSize: '14px',
    marginBottom: '90px',
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Landing);
