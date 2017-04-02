import React from 'react';
import { css } from 'glamor';

import { LIGHT_GRAY, LIGHT_PRIMARY, WHITE } from '../../../palette';

export default function Goal({ goal }) {
  return(
    <div { ...styles.goalContainer }>
      <div { ...styles.goalPrompt }>Goal</div>
      <div { ...styles.goalBox } >
        <div> { goal.description } </div>
      </div>
    </div>
  );
}


const styles = {
  goalContainer: css({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '4px',
    border: `2px solid ${LIGHT_PRIMARY}`,
    minHeight: '80px',
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
  goalBox: css({
    fontFamily: 'BlinkMacSystemFont',
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
  }),
  goal: css({
  }),
}
