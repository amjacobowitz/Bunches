import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../palette';

import Heading from '../../components/heading';

import changePath from '../../actions/change-path';

class Landing extends Component {
  onClick = (userType) => {
    this.props.changePath(`/${userType}`);
  }

  render() {
    return (
      <div { ...styles.routeContainer }>
        <Heading
          heading="bunches"
          subheading="small grouping made easy"
        />
        <div { ...styles.buttonContainer }>
          <button
            { ...styles.button }
            onClick={ () => this.onClick('teacher') }
          >
            <span { ...styles.buttonText }>
              teacher
            </span>
          </button>
          <button
            { ...styles.button }
            onClick={ () => this.onClick('student') }
          >
            <span { ...styles.buttonText }>
              student
            </span>
          </button>
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  changePath
};

const mapStateToProps = ({ }) => ({
});

const styles = {
  routeContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    flexDirection: 'column',
  }),
  buttonContainer: css({
    marginTop: '50px',
    display: 'flex',
    width: '400px',
    justifyContent: 'space-between'
  }),
  button: css({
    backgroundColor: WHITE,
    borderStyle: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    padding: '12px',
    color: PRIMARY,
    border: `1px solid ${PRIMARY}`,
    ':hover': {
      backgroundColor: PRIMARY,
      color: WHITE,
    }
  }),
  buttonText: css({
    fontWeight: 100,
    margin: '0 auto',
    fontSize: '30px',
    padding: '30px',
  }),

}

export default connect(mapStateToProps, mapActionsToProps)(Landing);
