import React from 'react';
import { css } from 'glamor';

import Goal from './goal';

import { LIGHT_GRAY, LIGHT_PRIMARY, WHITE } from '../../../palette';

export default function Goals({ goalObjs }) {
  return(
    <div { ...styles.goalsContainer }>
      <div { ...styles.goalPrompt }>Goals</div>
      <div { ...styles.goalList }>
        {
          goalObjs.map((goal, i) => {
            return (
              <div { ...styles.goalBox } key={ i }>
                <span>{ i+1 })</span>
                <Goal { ...styles.goal } goal={ goal }/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}


const styles = {
  goalsContainer: css({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '4px',
    border: `2px solid ${LIGHT_PRIMARY}`
  }),
  goalPrompt: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    backgroundColor: LIGHT_PRIMARY,
    color: WHITE,
    fontSize: '30px',
    height: 'auto',
    opacity: 0.5,
  }),
  goalList: css({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    padding: '10px',
    color: LIGHT_GRAY,
  }),
  goalBox: css({
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
  }),
  goal: css({
  }),
}
