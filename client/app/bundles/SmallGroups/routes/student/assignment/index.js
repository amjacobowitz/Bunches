import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { css } from 'glamor';
import { connect } from 'react-redux';

import Directions from './directions';
import Goals from './goals';
import DropArea from './drop-area';

import Heading from '../../../components/heading';
import Button from '../../../components/button';

import completeAssignment from '../../../actions/complete-assignment';
import fetchStudentAndAssignment from '../../../actions/fetch-student-and-assignment';


class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = { files: [], imgError: false };
  }

  componentWillMount() {
    this.props.fetchStudentAndAssignment(this.props.params.id);
  }

  onClick = () => {
    this.props.completeAssignment();
  }

  onDrop = (acceptedFiles) => {
    this.setState({ files: acceptedFiles})
  }

  onDelete = () => {
    this.setState({ files: [], imgError: false });
  }

  onError = () => {
    this.setState({ imgError: true })
  }

  render() {
    const { student, assignment } = this.props;
    return(
      <div { ...styles.routeContainer }>
        <Heading heading='My Itinerary - ' subheading={ student.name }>
          <div { ...styles.date }> { moment().format('dddd, MMM Do') } </div>
        </Heading>
        <div { ...styles.grid }>
          <div { ...styles.leftGrid }>
            <Goals goalObjs={ student.goals }/>
            <Directions
              directions={ assignment.directions }
              title={ assignment.title }
            />
          </div>
          <div { ...styles.rightRight }>
            <DropArea
              files={ this.state.files }
              imgError={ this.state.imgError }
              onDrop={ this.onDrop }
              onDelete={ this.onDelete }
              onError={ this.onError }
            />
          </div>
        </div>
        <div { ...styles.buttonContainer }>
          <Button
            onClick={ this.onClick }
            text={ 'done' }
          />
        </div>
      </div>
    );
  }
}

const mapActionsToProps = {
  completeAssignment,
  fetchStudentAndAssignment
};

const mapStateToProps = ({ assignment, student }) => ({
  student,
  assignment
});

const styles = {
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
