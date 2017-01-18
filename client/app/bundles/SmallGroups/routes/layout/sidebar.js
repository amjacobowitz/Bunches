import React from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../palette';

export default function Sidebar() {
  return (
    <div { ...styles.container }>
      <div { ...styles.links }>
        <div path='classes' { ...styles.link }>classes</div>
        <div path='assignments' { ...styles.link }>assignments</div>
        <div path='analysis' { ...styles.link }>analysis</div>
        <div path='settings' { ...styles.link }>settings</div>
      </div>
    </div>
  );
}

const mapActionsToProps = {
};

const mapStateToProps = ({ teacher }) => ({
  teacher,
});

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    borderRight: `1px solid ${PRIMARY}`,
    height: '75vh',
    marginBottom: '30px',
    marginTop: '30px',
  }),
  links: css({
    marginLeft: '10px',
  }),
  link: css({
    margin: '5px',
    ':hover': {
      color: LIGHT_PRIMARY,
    }
  })
}
