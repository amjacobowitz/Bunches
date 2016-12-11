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
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: PRIMARY,
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  text: css({
    color: WHITE,
  }),
}
