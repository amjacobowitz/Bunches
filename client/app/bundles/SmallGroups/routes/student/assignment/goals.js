import React from 'react';
import { css } from 'glamor';

import Goal from './goal';

import { LIGHT_PRIMARY, WHITE } from '../../../palette';

const goals = ['Kill it', 'Be awesome', 'Be me!'];

export default function Goals() {
  return(
    <div { ...styles.goalsContainer }>
      <div { ...styles.goalPrompt }>Goals</div>
      <div { ...styles.goalList }>
        {
          goals.map((goal, i) => {
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
    border: `4px solid ${LIGHT_PRIMARY}`
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
  }),
  goalBox: css({
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
  }),
  goal: css({
  }),

}
