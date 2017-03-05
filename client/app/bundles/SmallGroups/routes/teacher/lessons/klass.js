import React, { Component } from 'react';
import { css } from 'glamor';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import {
  WHITE,
  PRIMARY,
  LIGHT_PRIMARY,
  LIGHTEST_PRIMARY,
  SECONDARY,
  GRAY,
  LIGHT_GRAY,
} from '../../../palette';


const klassTarget = {
  drop(props, monitor) {
    const lesson = monitor.getItem();
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class Klass extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      connectDropTarget,
    } = this.props;

    return connectDropTarget(
      <div { ...styles.container }>
      </div>
    );
  }
}

const styles = {
  container: css({
    fontFamily: 'BlinkMacSystemFont',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '300px',
    height: '300px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    marginLeft: '30px',
    marginBottom: '30px',
  }),
}

const mapActionsToProps = {
};

const mapStateToProps = ({}) => {
  return {

  };
};

Klass = DropTarget('lesson', klassTarget, collect)(klass);
export default connect(mapStateToProps, mapActionsToProps)(Klass);
