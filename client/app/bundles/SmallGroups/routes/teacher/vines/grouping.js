import React, { Component } from 'react';
import { css } from 'glamor';
import { DragSource } from 'react-dnd';

import { LIGHT_GRAY, BLACK, LIGHT_PRIMARY, WHITE } from '../../../palette';

const vineSource = {
  beginDrag(props) {
    const { vine } = props;
    return { ...vine };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


class Vine extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    const { vine, index } = this.props;
    this.props.onClick(vine.id, index)
  }

  render() {
    const { isDragging, connectDragSource, selectedVineId, vine } = this.props;

    const vineStyle = vine.id === selectedVineId ?
      styles.vineSelected :
      styles.vine;

    return connectDragSource(
      <div
        { ...vineStyle }
        onClick={ () => this.onClick(vine.id)  }
      >
        { vine.title }
      </div>
    )
  }
}

const styles = {
  vine: css({
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
  vineSelected: css({
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

export default DragSource('vine', vineSource, collect)(Vine);
