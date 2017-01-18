import React from 'react';
import { css } from 'glamor';

const grapes = require('!!url!./grapes.png');

import { PRIMARY, WHITE } from '../../palette';

export default function Header() {
  return (
    <div { ...styles.container }>
      <div { ...styles.iconContainer }>
        <img { ...styles.grapes } src={ grapes } />
        <span { ...styles.big }>bunches</span>
      </div>
    </div>
  );
}

const styles = {
  container: css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '70px',
    borderBottom: `1px solid ${PRIMARY}`
  }),
  iconContainer: css({
    color: PRIMARY,
    fontWeight: 100,
    display: 'flex',
    marginLeft: '20px',
    fontWeight: 100,
    alignItems: 'center'
  }),
  small: css({
    fontSize: '14px',
  }),
  big: css({
    fontSize: '20px',
  }),
  grapes: css({
    height: '30px',
  }),
}

