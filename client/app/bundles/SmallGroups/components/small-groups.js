import React, { Component, PropTypes } from 'react';

export default class SmallGroups extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
  }

  render() {
    return (
      <div>
        Welcome {this.state.name}, to small groups!
      </div>
    )
  }
}

