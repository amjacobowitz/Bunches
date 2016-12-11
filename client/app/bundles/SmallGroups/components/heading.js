import React from 'react';
import { css } from 'glamor';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../palette';

export default function Heading({ children, heading, subheading }) {
  return (
    <div { ...styles.headingContainer }>
      <div { ...styles.heading }>
        { heading }
        { children }
      </div>
      <div { ...styles.subheading }>
        { subheading }
      </div>
    </div>
  )
}

const styles = {
  headingContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: LIGHT_PRIMARY,
    color: WHITE,
    marginBottom: '30px',
    borderRadius: '10px',
    border: `2px solid ${PRIMARY}`,
    lineHeight: '40px',
  }),
  heading: css({
    fontSize: '36px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  subheading: css({
    display: 'flex',
    justifyContent: 'center',
    alignText: 'center',
    fontSize: '24px',
    color: PRIMARY,
  }),
}
