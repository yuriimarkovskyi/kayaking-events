import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSelect = styled.select`
  padding-left: 10px;
  height: 40px;
`;

function Select({ children }) {
  return <StyledSelect>{children}</StyledSelect>;
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Select;
