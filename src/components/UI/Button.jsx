import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children, type, secondary, onClick, disabled,
}) {
  return (
    <button
        /* eslint-disable-next-line react/button-has-type */
      type={type}
      className={`button ${secondary ? 'button_secondary' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'submit',
  secondary: false,
  onClick: null,
  disabled: false,
};

export default Button;
