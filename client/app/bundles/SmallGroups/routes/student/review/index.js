import React, { Component, PropTypes } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import Goals from '../assignment/goals';

import Heading from '../../../components/heading';
import Button from '../../../components/button';
import TextArea from '../../../components/textarea';

import changeReview from '../../../actions/change-review';
import submitAssignment from '../../../actions/submit-assignment';
import fetchStudentAndAssignment from '../../../actions/fetch-student-and-assignment';

class Review extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchStudentAndAssignment(this.props.params.id);
  }

  onClick = () => {
    this.props.submitAssignment();
  }

  onChange = (value) => {
    this.props.changeReview(value);
  }

  render() {
    const { student, review, assignment } = this.props;

    if (assignment.submitted) {
      return (
        <div { ...styles.completeMessage }>
          <Heading
            heading='all done'
            subheading='great job!'
          />
        </div>
      );
    }

    return(
      <div { ...styles.routeContainer }>
        <Heading
          heading='Grading Myself'
          subheading={'How did I do?  Did I meet my goal?  Why do I think that?  How do I know? How can I do better?'}
        />
        <Goals goalObjs={ student.goals }/>
        <div { ...styles.reviewSectionTitle }>My Review</div>
        <TextArea
          onChange={ this.onChange }
          value={ review.body }
          placeholder='I think...'
          charCount={ true }
        />
        <div { ...styles.buttonContainer }>
          <Button
            onClick={ this.onClick }
            disabled={ review.body.length < 100 }
            text={ 'submit' }
          />
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  changeReview,
  submitAssignment,
  fetchStudentAndAssignment,
};

const mapStateToProps = ({
  student,
  review,
  assignment
}) => ({
  student,
  review,
  assignment
});

const styles = {
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '70%',
    textAlign: 'center',
  }),
  reviewSectionTitle: css({
    marginTop: '20px',
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
