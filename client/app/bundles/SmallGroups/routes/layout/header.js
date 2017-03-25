import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import changePath from '../../actions/change-path';

const grapes = require('!!url!./grapes.png');

import { PRIMARY, WHITE } from '../../palette';


class Header extends Component {
  constructor(props){
    super(props);
  }

  onClick = () => {
    let location = window.location.pathname;
    const lastBackSlashIndex = location.split('/', 3).join('/').length;
    const homePath = location.slice(0, lastBackSlashIndex+1) + 'dashboard';
    this.props.changePath(homePath);
  }

  render() {
    return (
      <div { ...styles.container }>
        <div { ...styles.iconContainer } onClick={ this.onClick }>
          <img { ...styles.grapes } src={ grapes } />
          <span { ...styles.big }>bunches</span>
        </div>
      </div>
    );
  }
}

const styles = {
  container: css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    borderBottom: `1px solid ${PRIMARY}`
  }),
  iconContainer: css({
    color: PRIMARY,
    fontWeight: 100,
    display: 'flex',
    marginLeft: '20px',
    fontWeight: 100,
    alignItems: 'center',
    cursor: 'pointer',
  }),
  small: css({
    fontSize: '14px',
  }),
  big: css({
    fontSize: '20px',
  }),
  grapes: css({
    height: '30px',
  }),
}

const mapActionsToProps = {
  changePath,
};

export default connect(null, mapActionsToProps)(Header);
