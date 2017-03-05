import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

const groups = require('!!url!./groups.png');
const lessons = require('!!url!./lessons.png');
const analysis = require('!!url!./analysis.png');

import Button from '../../../components/button';
import TextInput from '../../../components/text-input';

import Option from './option';

import changePath from '../../../actions/change-path';
import fetchTeacher from '../../../actions/fetch-teacher';

import { allKlasses } from '../../../selectors/klasses';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../../palette';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    if (props.klasses.length === 0) {
      props.fetchTeacher(props.params.id);
    }
  }

  onClick = (word) => {
    this.props.changePath(`/teacher/${this.props.params.id}/${word}`)
  }

  render() {
    const { params } = this.props;
    return (
      <div { ...styles.routeContainer }>
        <div { ...styles.row }>
          <Option
            img={ groups }
            text='vines'
            link='groups'
            onClick={ this.onClick }
          />
          <Option
            img={ lessons }
            text='lessons'
            link='lessons'
            onClick={ this.onClick }
          />
          <Option
            img={ analysis }
            text='analysis'
            link='analysis'
            onClick={ this.onClick }
          />
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  changePath,
  fetchTeacher
};

const mapStateToProps = ({ klasses }) => ({
  klasses: Object.keys(klasses)
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
