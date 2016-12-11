import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { css } from 'glamor';

import ActivityDirections from './directions';
import Goals from './goals';

import Heading from '../../../components/heading';
import Button from '../../../components/button';

export default class StudentOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div { ...styles.routeContainer }>
        <Heading heading='My Itinerary - ' subheading={ 'Meg' }>
          <div { ...styles.date }> { moment().format('dddd, MMM Do') } </div>
        </Heading>
        <Goals />
        <ActivityDirections directions='Do your best.'/>
        <div { ...styles.buttonContainer }>
          <Button
            text={ 'Done' }
          />
        </div>
      </div>
    );
  }
}
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
