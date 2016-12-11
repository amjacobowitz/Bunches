import React from 'react';
import { css } from 'glamor';

import { PRIMARY, WHITE } from '../../palette';

export default function Header() {
  return (
    <div { ...styles.container }>
      <div { ...styles.textContainer }>
        <span { ...styles.small }>small</span>
        <span { ...styles.big }>groups</span>
      </div>
    </div>
  );
}

const styles = {
  container: css({
    width: '100%',
    backgroundColor: PRIMARY,
    display: 'flex',
    alignItems: 'center',
    height: '70px',
  }),
  textContainer: css({
    color: WHITE,
    fontWeight: 100,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
  }),
  small: css({
    fontSize: '14px',
  }),
  big: css({
    fontSize: '20px',
  }),
}

