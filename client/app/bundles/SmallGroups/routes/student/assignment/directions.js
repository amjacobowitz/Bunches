import React from 'react';
import { css } from 'glamor';

import { LIGHT_GRAY, GRAY, LIGHT_PRIMARY, WHITE } from '../../../palette';

export default function Directions({ title, directions }) {
  return (
    <div { ...styles.directionsContainer }>
      <div { ...styles.prompt }>
        What am I doing today?
      </div>
      <div { ...styles.title }>
        { title }
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
    border: `2px solid ${LIGHT_PRIMARY}`,
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
  title: css({
    padding: '30px',
    color: GRAY,
    fontSize: '16px',
    textAlign: 'center',
  }),
  directions: css({
    padding: '20px',
    color: LIGHT_GRAY,
  }),
}
