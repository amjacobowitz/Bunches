import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

const groups = require('!!url!./groups.png');
const lessons = require('!!url!./lessons.png');
const analysis = require('!!url!./analysis.png');
const calendar = require('!!url!./calendar.png');
const assignments = require('!!url!./assignments.png');
const live = require('!!url!./live.png');

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
    this.props.changePath(`/teacher/${this.props.params.id}/${word}`);
  }

  render() {
    const { params } = this.props;
    return (
      <div { ...styles.routeContainer }>
        <div { ...styles.rows }>
          <div { ...styles.row }>
            <Option
              img={ groups }
              text='vines'
              link='vines'
              onClick={ this.onClick }
            />
            <Option
              img={ calendar }
              text='calendar'
              link='calendar'
              onClick={ this.onClick }
            />
            <Option
              img={ analysis }
              text='analysis'
              link='analysis'
              onClick={ this.onClick }
            />
          </div>
          <div { ...styles.row }>
            <Option
              img={ lessons }
              text='lessons'
              link='lessons'
              onClick={ this.onClick }
            />
            <Option
              img={ assignments }
              text='assignments'
              link='assignments'
              onClick={ this.onClick }
            />
          </div>
          <div { ...styles.row }>
            <Option
              img={ live }
              text='live view'
              link='live'
              onClick={ this.onClick }
            />
          </div>
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
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),
  rows: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  row: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
  }),
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
