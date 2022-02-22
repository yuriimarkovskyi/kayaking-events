import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  &[type="text"],
  &[type="email"],
  &[type="phone"] {
    padding-left: 10px;
    height: 40px;
  }

  &::placeholder {
    color: #c0c0c0;
  }
`;

const Input = forwardRef(({
  type,
  value,
  onKeyDown,
  placeholder,
  ...props
}, ref) => (
  <StyledInput
    type={type}
    value={value}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    ref={ref}
    {...props}
  />
));

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  onKeyDown: null,
  placeholder: null,
};

export default Input;
