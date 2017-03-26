import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import Button from '../../../components/button';

import { SECONDARY, PRIMARY, LIGHTEST_GRAY } from '../../../palette';

const close = require('!!url!../vine/close.png');
const closeRed = require('!!url!../vine/close-red.png');
const thumbsUp = require('!!url!./thumbs-up.png');
const thumbsDown = require('!!url!./thumbs-down.png');

import editSubmission from '../../../actions/edit-submission';

class StudentSubmission extends Component {
  constructor(props) {
    super(props);
    let editorState = EditorState.createWithContent(convertFromRaw(props.submission.answer));
    let score = '';
    if (props.submission.score) {
      score = props.submission.score.toString();
    }
    this.state = {
      score,
      editorState,
      message: '',
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState, message: '' });
  }

  onKeyDown = (event) => {
    if (event.keyCode === 8) {
      this.setState({ score: '' });
    }
  }

  onSaveFeedback = () => {
    const { submission } = this.props;
    const { editorState, score } = this.state;

    this.props.editSubmission(
      submission.id,
      convertToRaw(editorState.getCurrentContent()),
      parseInt(score)
    );
    this.setState({ message: 'Feedback Saved' });
  }

  changeScore = (event) => {
    if (this.state.score.length < 3) {
      this.setState({ score: event.target.value, message: '' });
    }
  }

  render() {
    const { submission, removeEditor, student } = this.props;
    const { message, score, editorState } = this.state;
    const thumb = submission.rating === 1 ? thumbsUp : thumbsDown;

    return (
      <div { ...styles.submission }>
        <div { ...styles.studentName }>
          { `${student.firstName} ${student.lastName}` }
        </div>
        <div { ...styles.scoreContainer }>
          <input
            { ...styles.scoreLine }
            placeholder="_____"
            value={ score }
            onChange={ this.changeScore }
            onKeyDown={ this.onKeyDown }
          />
          <span { ...styles.oneHundred }>/100</span>
        </div>
        <div { ...styles.wrapper }>
          <div { ...styles.closeContainer }>
            <div { ...styles.close }  onClick={ () => removeEditor(student) } />
          </div>

         <Editor
            editorState={ editorState }
            onEditorStateChange={ this.onEditorStateChange }
            toolbar={
              {
                options: [
                  'inline',
                  'fontSize',
                  'fontFamily',
                  'list',
                  'textAlign',
                  'colorPicker',
                  'link',
                  'image',
                  'remove',
                  'history'
                ],
                inline: {
                  options: ['bold', 'italic', 'underline'],
                },
                textAligngn: {
                  options: ['left', 'center', 'right'],
                },
                link: {
                  options: ['link']
                },
              }
            }
            toolbarStyle={ styles.toolbar }
          />
        </div>
        <div { ...styles.reflectionContainer }>
          <div { ...styles.review }>
            <div { ...styles.reviewTitle }>Review</div>
            <div>  { submission.review } </div>
          </div>
          <div { ...styles.rating }>
            <div { ...styles.ratingTitle }>Rating</div>
            {
              submission.rating && (
                <img src={ thumb } { ...styles.thumb }/>
              )
            }
          </div>
        </div>
        <div { ...styles.message }>
          { message }
        </div>
        <Button
          disabled={ !score }
          text="save feedback"
          onClick={ this.onSaveFeedback }
        />
      </div>
    )
  }
}

const styles = {
  message: css({
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont',
    color: SECONDARY,
    minHeight: '30px',
  }),
  reflectionContainer: css({
    display: 'flex',
    marginBottom: '20px',
  }),
  review: css({
    borderLeft: `1px solid ${LIGHTEST_GRAY}`,
    borderBottom: `1px solid ${LIGHTEST_GRAY}`,
    minWidth: '720px',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'BlinkMacSystemFont',
    fontWeight: 100,
  }),
  ratingTitle: css({
    fontSize: '20px',
  }),
  reviewTitle: css({
    fontSize: '20px',
  }),
  rating: css({
    borderLeft: `1px solid ${LIGHTEST_GRAY}`,
    borderRight: `1px solid ${LIGHTEST_GRAY}`,
    borderBottom: `1px solid ${LIGHTEST_GRAY}`,
    minWidth: '300px',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'BlinkMacSystemFont',
    fontWeight: 100,
  }),
  submission: css({
    position: 'relative',
    marginTop: '20px',
    flex: '1 0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }),
  wrapper: css({
    padding: '10px',
    margin: '10px',
    position: 'relative',
    border: `1px solid ${LIGHTEST_GRAY}`,
    height: '300px',
    width: '1000px',
  }),
  toolbar: {
    width: '95%',
  },
  studentName: css({
    fontSize: '24px',
    fontWeight: 100,
    fontFamily: 'BlinkMacSystemFont'
  }),
  close: css({
    marginRight: '5px',
    marginTop: '5px',
    backgroundImage: `url(${ close })`,
    width: '20px',
    height: '20px',
    ':hover': {
      backgroundImage: `url(${ closeRed })`,
    }
  }),
  closeContainer: css({
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: '5px',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    cursor: 'pointer',
  }),
  scoreContainer: css({
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: '90px',
    marginTop: '5x',
    display: 'flex',
    width: '10px',
    height: '30px'
  }),
  scoreLine: css({
    borderBottom: 'none',
    marginBottom: '12.5px',
    textAlign: 'right',
    width: '35px',
    fontWeight: 100,
    textAlign: 'center',
    fontSize: '20px',
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #ddd'
  }),
  oneHundred: css({
    fontWeight: 100,
    fontSize: '20px',
    fontFamily: 'BlinkMacSystemFont'
  }),
  thumb: css({
    height: '80px'
  }),
};

const mapActionsToProps = {
  editSubmission
};

const mapStateToProps = ({
  assignments,
  days,
  submissions
}, ownProps) => {

  const day = days[ownProps.params.dayId]

  const dayAssignments = day.assignments.map((aId) => {
    return assignments[aId];
  });

  const assignmentsForLessonOnDay = Object.values(dayAssignments).filter((a) => {
    return a.lessons.includes(ownProps.lesson.id);
  });

  const submissionIds = Object.values(assignmentsForLessonOnDay).reduce((subIds, assignment) => {
    return subIds.concat(assignment.submissions);
  }, []);

  let studentSubmission = {};

  if (submissionIds) {
    const submissionsForAssignments = submissionIds.map((submissionId) => {
      return submissions[submissionId];
    });

    studentSubmission = Object.values(submissionsForAssignments).filter((submission) =>  {
      return submission.studentId == ownProps.student.id && submission.dayId === ownProps.params.dayId;
    })[0];
  }

  return {
    submission: studentSubmission
  }
};

export default connect(mapStateToProps, mapActionsToProps)(StudentSubmission);
