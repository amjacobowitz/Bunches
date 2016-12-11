import React from 'react';
import { css } from 'glamor';

import { LIGHT_PRIMARY, WHITE } from '../../../palette';

export default function ActivityDirections({ directions }) {
  return (
    <div { ...styles.directionsContainer }>
      <div { ...styles.prompt }>
        What am I doing today?
      </div>
      <div { ...styles.directions }>
        { directions }
      </div>
    </div>
  )
}

const styles = {
  directionsContainer: css({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    border: `4px solid ${LIGHT_PRIMARY}`,
    marginTop: '30px',
  }),
  prompt: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_PRIMARY,
    color: WHITE,
    fontSize: '30px',
    height: '60px',
    lineHeight: '40px',
    textAlign: 'center',
    opacity: 0.5,
  }),
  directions: css({
    padding: '20px',
  }),
}
