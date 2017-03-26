import React from 'react';
import { css } from 'glamor';

import { LIGHT_GRAY, GRAY } from '../palette';

export default function TextArea({ charCount, style, onChange, placeholder, value}) {
  const countStyle = value.length > 100 ? 'green' : 'red';

  const noSpaceValue = value.replace(/\s/g, '').length;

  return (
    <div style={ styles.container }>
      <textarea
        style={ { ...styles.textarea, ...styles } }
        onChange={ (e) => onChange(e.target.value) }
        placeholder={ placeholder }
        value={ value }
      />
      {
        charCount && (
          <div style={ styles.charCount }>
            <div style={ { color: countStyle } } >{ noSpaceValue }</div>
          </div>
        )
      }
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '2px',
    border: `1px solid ${LIGHT_GRAY}`,
    padding: '1em',
    height: '150px',
  },
  textarea: {
    color: GRAY,
    fontSize: '1.25em',
    fontWeight: 300,
    resize: 'none',
    border: 'none',
    outline: 'none',
    height: '250px',
  },
  charCount: {
    alignSelf: 'flex-end',
    marginRight: '20px',
    marginBottom: '5px',
  },
};
