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
    display: 'flex',
    alignItems: 'center',
    height: '70px',
    borderBottom: `1px solid ${PRIMARY}`
  }),
  textContainer: css({
    color: PRIMARY,
    fontWeight: 100,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    fontWeight: 100,
  }),
  small: css({
    fontSize: '14px',
  }),
  big: css({
    fontSize: '20px',
  }),
}

