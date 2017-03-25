import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { css } from 'glamor';
import { connect } from 'react-redux';

import Directions from './directions';
import Goal from './goal';
import DropArea from './drop-area';

import { LIGHT_PRIMARY } from '../../../palette';

import Heading from '../../../components/heading';
import Button from '../../../components/button';

import completeSubmission from '../../../actions/complete-submission';
import fetchStudentAndAssignment from '../../../actions/fetch-student-and-assignment';

class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base64URL: '',
      files: [],
      editorState: EditorState.createEmpty(),
      imgError: false
    };
  }

  componentWillMount() {
    this.props.fetchStudentAndAssignment(this.props.params.id);
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  }

  onClick = () => {
    const { base64URL, editorState } = this.state;
    const currentContent = editorState.getCurrentContent();
    const raw = convertToRaw(currentContent);
    this.props.completeSubmission(raw);
  }

  onDrop = (acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.setState({ base64URL: fileReader.result, files: acceptedFiles });
    }
    fileReader.readAsDataURL(acceptedFiles[0]);
  }

  onDelete = () => {
    this.setState({ base64URL: '', files: [], imgError: false });
  }

  onError = () => {
    this.setState({ imgError: true })
  }

  render() {
    const { base64URL, files, editorState } = this.state;
    const { student, assignment } = this.props;
    return(
      <div { ...styles.routeContainer }>
        <Heading heading='My Itinerary - ' subheading={ student.name }>
          <div { ...styles.date }> { moment().format('dddd, MMM Do') } </div>
        </Heading>
        <Goal goal={ student.goal || {} }/>
        <Directions
          directions={ assignment.directions }
          title={ assignment.title }
        />
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
              }
            }
          }
          wrapperStyle={ styles.wrapperStyle }
        />
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
  completeSubmission,
  fetchStudentAndAssignment,
};

const mapStateToProps = ({ assignment, student }) => ({
  student,
  assignment
});

const styles = {
  wrapperStyle: {
    marginTop: '10px',
    padding: '20px',
    border: `1px solid ${ LIGHT_PRIMARY }`,
    height: '300px',
  },
  routeContainer: css({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '800px',
  }),
  grid: css({
    display: 'flex',
    flexDirecton: 'row',
  }),
  leftGrid: css({
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    marginRight: '20px',
  }),
  rightGrid: css({
    height: '230px',
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

export default connect(mapStateToProps, mapActionsToProps)(Assignment)
