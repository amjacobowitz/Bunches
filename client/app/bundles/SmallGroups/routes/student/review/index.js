import React, { Component, PropTypes } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import Goal from '../assignment/goal';

import { LIGHTEST_SECONDARY, LIGHTEST_RED } from '../../../palette';

import Heading from '../../../components/heading';
import Button from '../../../components/button';
import TextArea from '../../../components/textarea';

const thumbsUp = require('!!url!../assignment/thumbs-up.png');
const thumbsDown = require('!!url!../assignment/thumbs-down.png');

import changeReview from '../../../actions/change-review';
import changeRating from '../../../actions/change-rating';
import submitSubmission from '../../../actions/submit-submission';
import fetchStudentAndAssignment from '../../../actions/fetch-student-and-assignment';

class Review extends Component {
  constructor(props) {
    super(props);
    if (!props.student.id) {
      props.fetchStudentAndAssignment(props.params.id);
    }
  }

  onClick = () => {
    this.props.submitSubmission();
  }

  onChange = (value) => {
    this.props.changeReview(value);
  }

  render() {
    const { student, submission } = this.props;
    if (submission.submitted) {
      return (
        <div { ...styles.completeMessage }>
          <Heading
            heading='all done'
            subheading='great job!'
          />
        </div>
      );
    }
    const thumbsUpStyle = submission.rating === 1 ? { ...styles.thumbsUpSelected, ...styles.thumbsUp } : styles.thumbsUp;
    const thumbsDownStyle = submission.rating === 0 ? { ...styles.thumbsDownSelected, ...styles.thumbsDown } : styles.thumbsDown;

    return(
      <div { ...styles.routeContainer }>
        <Heading
          heading='Grading Myself'
          subheading={'How did you do?  Did you meet your goal?  Why do I think that?  How do I know?  How can I do better?'}
        />
        <Goal goal={ student.goal }/>
        <div { ...styles.sectionTitle }>My Thoughts</div>
        <TextArea
          onChange={ this.onChange }
          value={ submission.review || '' }
          placeholder='I think...'
          charCount={ true }
          style={ styles.review }
        />
        <div { ...styles.sectionTitle }>Overall</div>
        <div { ...styles.ratings }>
          <img { ...thumbsDownStyle }
            src={ thumbsDown }
            onClick={ () => this.props.changeRating(0) }
          />
          <img { ...thumbsUpStyle }
            src={ thumbsUp }
            onClick={ () => this.props.changeRating(1) }
          />
        </div>
        <div { ...styles.buttonContainer }>
          <Button
            onClick={ this.onClick }
            text={ 'submit' }
          />
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  changeRating,
  changeReview,
  submitSubmission,
  fetchStudentAndAssignment,
};

const mapStateToProps = ({
  submission,
  student,
}) => ({
  student,
  submission,
});

const styles = {
  thumbsUp: css({
    height: '100px',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: LIGHTEST_SECONDARY
    },
  }),
  thumbsUpSelected: css({
    backgroundColor: LIGHTEST_SECONDARY
  }),
  thumbsDown: css({
    height: '100px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '40px',
    ':hover': {
      backgroundColor: LIGHTEST_RED
    },
  }),
  thumbsDownSelected: css({
    backgroundColor: LIGHTEST_RED
  }),
  ratings: css({
    marginTop: '20px',
  }),
  review: {
    width: '100%',
    height: '200px',
  },
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '70%',
    textAlign: 'center',
  }),
  sectionTitle: css({
    fontSize: '20px',
    marginTop: '20px',
    fontFamily: 'BlinkMacSystemFont',
    fontWeight: 100,
  }),
  completeMessage: css({
    marginTop: '100px',
  }),
  date: css({
    marginLeft: '10px',
  }),
  buttonContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  }),
}

export default connect(mapStateToProps, mapActionsToProps)(Review);
