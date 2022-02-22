import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSelect = styled.select`
  padding-left: 10px;
  height: 40px;
`;

const Select = forwardRef(({ children, ...props }, ref) => (
  <StyledSelect
    ref={ref}
    {...props}
  >
    {children}
  </StyledSelect>
));

Select.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Select;
