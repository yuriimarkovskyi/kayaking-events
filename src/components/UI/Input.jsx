import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding-left: 10px;
  height: 40px;

  &::placeholder {
    color: #c0c0c0;
  }
`;

function Input({ ...props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledInput {...props} />;
}

export default Input;
