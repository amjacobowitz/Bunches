import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';

import Form from './form';

class Edit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params, lesson } = this.props;
    return (
      <Form
        formType="edit"
        params={ params }
      />
    )
  }
}

const mapActionsToProps = {};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, mapActionsToProps)(Edit);
