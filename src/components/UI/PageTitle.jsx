import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  text-align: center;
`;

function PageTitle({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PageTitle;
