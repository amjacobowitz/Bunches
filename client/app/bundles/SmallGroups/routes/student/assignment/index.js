import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { css } from 'glamor';
import { connect } from 'react-redux';

import ActivityDirections from './directions';
import Goals from './goals';

import Heading from '../../../components/heading';
import Button from '../../../components/button';

class Assignment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goalObjs, name } = this.props;
    debugger
    return(
      <div { ...styles.routeContainer }>
        <Heading heading='My Itinerary - ' subheading={ name }>
          <div { ...styles.date }> { moment().format('dddd, MMM Do') } </div>
        </Heading>
        <Goals goalObjs={ goalObjs }/>
        <ActivityDirections directions='Do your best.'/>
        <div { ...styles.buttonContainer }>
          <Button
            text={ 'done' }
          />
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {

};

const mapStateToProps = ({ student: { name, goals } }) => ({
  name,
  goalObjs: goals
});

const styles = {
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '70%',
  }),
  date: css({
    marginLeft: '10px',
  }),
  buttonContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  }),
}

export default connect(mapStateToProps, mapActionsToProps)(Assignment)
