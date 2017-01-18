import React, { Component } from 'react';
import { css } from 'glamor';

import { LIGHT_GRAY, BLACK, LIGHT_PRIMARY, WHITE } from '../../../palette';

export default class Grouping extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    const { grouping, index } = this.props;
    this.props.onClick(grouping.id, index)
  }

  render() {
    const groupingStyle = this.props.selected ?
      styles.groupingSelected :
      styles.grouping;

    return (
      <div
        { ...groupingStyle }
        onClick={ this.onClick }
      >
        { this.props.grouping.title }
      </div>
    )
  }
}

const styles = {
  grouping: css({
    fontSize: '14px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginLeft: '20px',
    marginBottom: '3px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: WHITE,
    color: BLACK,
    ':hover': {
      color: WHITE,
      backgroundColor: LIGHT_PRIMARY,
    }
  }),
  groupingSelected: css({
    fontSize: '14px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    marginLeft: '20px',
    marginBottom: '3px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '4px',
    color: WHITE,
    backgroundColor: LIGHT_PRIMARY,
    border: `1px solid ${WHITE}`,
    ':hover': {
      color: BLACK,
      backgroundColor: WHITE,
      border: `1px solid ${LIGHT_PRIMARY}`
    }
  }),
}
