import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

const klasses = require('!!url!./klasses.png');
const assignments = require('!!url!./assignments.png');
const analysis = require('!!url!./analysis.png');

import Button from '../../../components/button';
import TextInput from '../../../components/text-input';

import Option from './option';

import changePath from '../../../actions/change-path';

import { allKlasses } from '../../../selectors/klasses';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../../palette';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  onClick = (word) => {
    changePath(`/teacher/${this.props.params.id}/${word}`)
  }

  render() {
    const { changePath, params } = this.props;
    return (
      <div { ...styles.routeContainer }>
        <div { ...styles.row }>
          <Option
            img={ klasses }
            word='classes'
            onClick={ this.onClick }
          />
          <Option
            img={ assignments }
            word='assignments'
            onClick={ this.onClick }
          />
          <Option
            img={ analysis }
            word='analysis'
            onClick={ this.onClick }
          />
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  changePath,
};

const mapStateToProps = ({ }) => ({
});

const styles = {
  routeContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),
  row: css({
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
  }),
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
