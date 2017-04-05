import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import LiveChannel from '../../../channels/live-channel.js';
import Rodal from 'rodal';
require('rodal/lib/rodal.css');

import Heading from '../../../components/heading';

import { PRIMARY } from '../../../palette';

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: {},
      visible: false,
      selectedStudentId: ''
    };
  }

  toggleRodal = () => {
    this.setState({ visible: !this.state.visible })
  }

  componentDidMount() {
    this.liveChannel = new LiveChannel()
    this.liveChannel.subscribe(this.updateStudentView)
  }

  updateStudentView = (data) => {
    const { students } = this.state;
    const student = students[data.id];
    this.setState({ students: { ...students, [data.id]: { ...data } } });
  }

  selectStudent = (s) => {
    this.setState({ selectedStudentId: s.id });
    this.toggleRodal();
  }

  render() {
    const { students, selectedStudentId } = this.state;
    const selectedStudent = students[selectedStudentId] || {};
    return(
      <div { ...styles.routeContainer }>
        <Heading
          heading="lesson live view"
        />
        <div { ...styles.submissionsContainer }>
          {
            Object.values(students).map((s) => {
              return (
                 <div { ...styles.submission } key={ s.id } onClick={ () => this.selectStudent(s) }>
                  <div { ...styles.name }>
                    { s.name }
                  </div>
                  <div { ...styles.text }>
                    { s.text }
                  </div>
                </div>
              );
            })
          }
        </div>
        <Rodal
          visible={ this.state.visible }
          height={ 400 }
          onClose={ this.toggleRodal }
        >
          <div { ...styles.submissionLarge } key={ selectedStudent.id }>
            <div { ...styles.name }>
              { selectedStudent.name }
            </div>
            <div { ...styles.text }>
              { selectedStudent.text }
            </div>
          </div>
        </Rodal>
      </div>
    );
  }
}

const mapActionsToProps = {
};

const mapStateToProps = ({

}) => {

  return {

  };
}

const styles = {
  routeContainer: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  }),
  submissionsContainer: css({
    display: 'flex'
  }),
  submission: css({
    cursor: 'pointer',
    display: 'flex',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '200px',
    height: '200px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    marginRight: '10px',
    fontFamily: 'BlinkMacSystemFont',
    marginBottom: '10px',
  }),
  submissionLarge: css({
    display: 'flex',
    borderRadius: '4px',
    flexDirection: 'column',
    width: '400px',
    height: '400px',
    fontWeight: 100,
    border: `1px solid ${PRIMARY}`,
    marginRight: '10px',
    fontFamily: 'BlinkMacSystemFont',
  }),
  name: css({
    padding: '10px',
    justifyContent: 'center',
    fontWeight: 300,
    fontSize: '18px',
    flex: .2,
  }),
  text: css({
    padding: '5px',
    textAlign: 'left',
    flex: .8,
  }),
}

export default connect(mapStateToProps, mapActionsToProps)(Live);
