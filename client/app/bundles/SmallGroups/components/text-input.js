import React, { Component } from 'react';
import { css } from 'glamor';

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' }
  }

  onChange = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    const { style, placeholder } = this.props;

    return (
      <input
        style={ styles(style) }
        placeholder={ placeholder }
        onChange={ this.onChange }
        value={ this.state.text }
      />
    );
  }
}

const styles = (style) => {
  return {
    ...style,
    fontWeight: 100,
    textAlign: 'center',
    fontSize: '20px',
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #ddd'
  }
}
