import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTextArea = styled.textarea`
  padding-top: 5px;
  padding-left: 10px;
  height: 120px;
  resize: none;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const TextArea = forwardRef(({ placeholder, ...props }, ref) => (
  <StyledTextArea
    placeholder={placeholder}
    ref={ref}
    {...props}
  />
));

TextArea.propTypes = {
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  placeholder: null,
};

export default TextArea;
