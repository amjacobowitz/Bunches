import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import Form from './form';

class New extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form
        formType='new'
        params={ this.props.params }
        lesson={ undefined }
      />
    )
  }
}

const mapActionsToProps = {

};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, mapActionsToProps)(New);
