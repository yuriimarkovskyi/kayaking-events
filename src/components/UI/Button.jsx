import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  border: 1px solid #4ec7da;
  border-radius: ${(props) => (props.secondary ? '50%' : '5px')};
  padding: ${(props) => (props.secondary ? '0' : '10px 15px')};
  width: ${(props) => props.secondary && '30px'};
  height: ${(props) => props.secondary && '30px'};
  font-size: ${(props) => (props.secondary ? '22px' : '18px')};
  line-height: ${(props) => props.secondary && '0'};
  background: #4ec7da;
  color: white;
  transition: 0.4s;

  &:hover {
    background: white;
    color: #4ec7da;
  }

  &[disabled] {
    pointer-events: none;
    border: 1px solid transparent;
    background: #c0c0c0;
  }
`;

function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
