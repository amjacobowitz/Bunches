import React from 'react';
import { css } from 'glamor';

import {
  GRAY,
} from '../../../palette';


export default function GoalDisplay({ goalOpen, description, onChange, onClick, onSubmit }) {
  const goalDisplay = goalOpen ?
                <input
                  { ...styles.goalInput }
                  onChange={ (e) => onChange(e, 'description') }
                  value={ description }
                  placeholder='goals'
                /> :
                <div
                  { ...styles.goal }
                  onClick={ () => onClick('description') }>
                  { description }
                </div>
  return (
    <div { ...styles.goalWrapper }>
      <div { ...styles.goalContainer }>
        <form onSubmit={ (e) => onSubmit(e, 'description') }>
          { goalDisplay }
        </form>
      </div>
    </div>
  )
}

const styles = {
  goalInput: css({
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 100,
    textAlign: 'center',
    outline: 'none',
    border: 'none',
    height: '80px',
    width: '130px',
    color: GRAY,
  }),
  goalWrapper: css({
    display: 'flex',
    justifyContent: 'center',
  }),
  goalContainer: css({
    padding: '3px',
    textAlign: 'center',
    marginTop: '10px',
    overflowY: 'auto',
    overflowX: 'auto',
    maxHeight: '100px',
    minHeight: '100px',
    marginBottom: '20px',
    borderRadius: '4px',
    minWidth: '180px',
    flex: 0.6,
    fontFamily: 'BlinkMacSystemFont',
  }),
  goal: css({
    fontSize: '16px',
    padding: '3px',
    fontWeight: 200,
    fontFamily: 'BlinkMacSystemFont',
    cursor: 'pointer',
    color: GRAY
  }),
}
