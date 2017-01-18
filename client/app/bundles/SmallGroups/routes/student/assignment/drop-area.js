import React from 'react';
import { css } from 'glamor';
import DropZone from 'react-dropzone';

import Button from '../../../components/button';

const plus = require('!!url!./plus.png');
const minus = require('!!url!./minus.png');
const thumbsUp = require('!!url!./thumbs-up.png');

import { LIGHT_GRAY, GRAY, LIGHT_PRIMARY, LIGHT_RED } from '../../../palette';

export default function DropArea({ files, onDrop, onDelete, onError, imgError }) {
  const height = files.length > 0 ? { height: '230px' } : { height: '280px' };
  return (
    <div { ...styles.container }>
      <DropZone
        style={ Object.assign(styles.dropZone, height) }
        onDrop={ onDrop }
      >
        {
          files.length > 0  ?
          files.map((file, i) =>
            <div key={ i } { ...styles.preview }>
              <img
                { ...styles.uploads }
                src={ imgError ? thumbsUp : file.preview }
                onError={ onError }
              />
            </div>
          ) :
          <div { ...styles.empty }>
            <div>Your work goes here</div>
            <img { ...styles.icon } src={ plus }/>
          </div>
        }
      </DropZone>
      {
        Boolean(files.length) && (
          <Button
            style={ { backgroundColor: LIGHT_RED, width: '202px' } }
            onClick={ () => onDelete() }
            text='remove'
          />
        )
      }
    </div>
  );
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  empty: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  dropZone: {
    width: '200px',
    border: `1px dashed ${GRAY}`,
    color: LIGHT_GRAY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexDirection: 'column',
    marginBottom: '5px',
  },
  uploads: css({
    width: '180px',
    height: '30%'
  }),
  icon: css({
    width: '50px',
    height: '50px',
    padding: '10px',
  }),
  preview: css({
    display: 'flex',
    flexDirection: 'column',
  })
}
