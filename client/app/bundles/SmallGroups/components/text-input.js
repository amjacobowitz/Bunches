import React, { Component } from 'react';
import { css } from 'glamor';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);
  }

  render() {
    const { name, style, onChange, placeholder } = this.props;

    return (
      <input
        style={ styles(style) }
        placeholder={ placeholder }
        onChange={ (e) => onChange(e.target.value, name) }
        value={ this.props.value }
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
