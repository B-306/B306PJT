import React from 'react';

function Input(props) {
  const { _onChange, width, height, placeholder, type } = props;

  return (
    <input
      onChange={_onChange}
      style={{ width, height }}
      placeholder={placeholder}
      type={type}
    />
  );
}

export default Input;