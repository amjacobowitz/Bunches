import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Rodal from 'rodal';
import View from './view';

import fetchTeacher from '../../../actions/fetch-teacher';
import changePath from '../../../actions/change-path';

import TextArea from '../../../components/textarea';
import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';

import { PRIMARY, LIGHT_GRAY, BLACK, LIGHT_PRIMARY, WHITE } from '../../../palette';

class Lessons extends Component {
  constructor(props) {
    super(props);
    if (props.lessons.length === 0) {
      props.fetchTeacher(props.params.id);
    }
  }

  render() {
    const { lessons, params } = this.props;
    return (
      <div { ...styles.routeContainer }>
        <Heading
          heading="lessons"
        />

        <Button
          onClick={ () => this.props.changePath(`/teacher/${this.props.params.id}/lessons/new`) }
          text='new'
          style={ styles.button }
          textStyle={ styles.buttonText }
        />
        <div { ...styles.lessonsContainer }>
          {
            lessons.map((lesson) => {
              return (
                <View
                  teacherId={ params.id }
                  key={ lesson.id }
                  title={ lesson.title }
                  lesson={ lesson }
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

const styles = {
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    textAlign: 'center',
  }),
  newAssignmentContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 350,
    marginTop: '20px',
  }),
  margin: css({
    marginTop: '20px',
  }),
  button: css({
    marginTop: '10px',
    height: '30px',
    width: '120px',
    padding: '3px',
  }),
  buttonText: css({
    fontSize: '14px'
  }),
  lessonsContainer: css({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'row'
  }),
};

const mapActionsToProps = {
  changePath,
  fetchTeacher,
};

const mapStateToProps = ({ lessons }) => ({
  lessons: Object.values(lessons)
});

export default connect(mapStateToProps, mapActionsToProps)(Lessons);
