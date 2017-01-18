import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../../palette';

export default function Option({ img, onClick, word }) {
  return (
   <div { ...styles.container } onClick={ () => onClick(word) }>
     <img { ...styles.image } src={ img } />
     <div>{ word }</div>
   </div>
  );
}

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '50%',
    border : `3px solid ${LIGHT_PRIMARY}`,
    height: '200px',
    width: '200px',
    opacity: 0.5,
    margin: '40px',
    cursor: 'pointer',
    ':hover': {
      border: `3px solid ${PRIMARY}`,
      opacity: 1.0,
    }
  }),
  image: css({
    width: '40%',
    height: '40%',
    marginBottom: '10px'
  }),
}
