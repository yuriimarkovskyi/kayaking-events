import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  padding-top: 5px;
  padding-left: 10px;
  height: 120px;
  resize: none;

  &::placeholder {
    color: #c0c0c0;
  }
`;

function TextArea() {
  return <StyledTextArea />;
}

export default TextArea;
