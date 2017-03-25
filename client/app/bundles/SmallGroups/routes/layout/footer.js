import React from 'react';
import { css } from 'glamor';

import { PRIMARY, WHITE } from '../../palette';

export default function Footer() {
  return (
    <div { ...styles.container }>
      <div { ...styles.text }>
        &copy; JacoboCorp
      </div>
    </div>
  );
}

const styles = {
  container: css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '30px',
    width: '100%',
    display: 'flex',
    marginTop: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `1px solid ${PRIMARY}`
  }),
  text: css({
    color: PRIMARY,
  }),
}
