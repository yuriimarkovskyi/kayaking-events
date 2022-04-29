import React from 'react';
import PropTypes from 'prop-types';

function Title({ className, children }) {
  return (
    <h1 className={`${className} title`}>
      {children}
    </h1>
  );
}

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Title.defaultProps = {
  className: '',
};

export default Title;
