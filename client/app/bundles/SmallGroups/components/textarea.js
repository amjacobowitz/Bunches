import React from 'react';
import { css } from 'glamor';

import { LIGHT_GRAY, GRAY } from '../palette';

export default function TextArea({ charCount, onChange, placeholder, value}) {
  const countStyle = value.length > 100 ? 'green' : 'red';

  const noSpaceValue = value.replace(/\s/g, '').length;

  return (
    <div { ...styles.container }>
      <textarea
        { ...styles.textarea }
        onChange={ (e) => onChange(e.target.value) }
        placeholder={ placeholder }
        value={ value }
      />
      {
        charCount && (
          <div { ...styles.charCount }>
            <div style={ { color: countStyle } } >{ noSpaceValue }</div>
          </div>
        )
      }
    </div>
  );
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '2px',
    border: `1px solid ${LIGHT_GRAY}`,
    padding: '1em',
    height: '300px',
  }),
  textarea: css({
    color: GRAY,
    fontSize: '1.25em',
    fontWeight: 300,
    resize: 'none',
    border: 'none',
    outline: 'none',
  }),
  charCount: css({
    alignSelf: 'flex-end',
    marginRight: '20px',
    marginBottom: '5px',
  }),
};
