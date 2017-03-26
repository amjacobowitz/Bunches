import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import { LIGHTEST_GRAY } from '../../../palette';

import StudentSubmission from './student-submission';

class SubmissionViewPort extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { removeEditor, lesson, students, params } = this.props;

    return (
      <div { ...styles.viewPort }>
        {
          Object.values(students).map((student, i) => {
            return (
              <StudentSubmission
                key={ student.id+i }
                student={ student }
                params={ params }
                lesson={ lesson }
                removeEditor={ removeEditor }
              />
            )
          })
        }
      </div>
    )
  }
}

const styles = {
  viewPort: css({
    display: 'flex',
    flexWrap: 'wrap',
    width: '1050px',
    minHeight: '400px',
    border: `1px solid ${LIGHTEST_GRAY}`,
  }),
};

const mapActionsToProps = {

};

const mapStateToProps = ({ lessons }, ownProps ) => {
  let lesson = [];
  if (ownProps.params.lessonId) {
    lesson = lessons[ownProps.params.lessonId];
  }

  return {
    lesson,
  }
};

export default connect(mapStateToProps, mapActionsToProps)(SubmissionViewPort);
