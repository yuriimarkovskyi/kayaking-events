import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeVisibility } from '../../store/visibilitySlice';

function Modal({ children }) {
  const dispatch = useDispatch();
  const visibility = useSelector((state) => state.visibility);

  const handleCloseModal = () => {
    dispatch(changeVisibility());
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      dispatch(changeVisibility());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`modal ${visibility ? 'active' : ''}`}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      <div className="modal__content">
        {children}
        <input
          type="image"
          src={`${window.location.origin}/images/icons/icon-close.png`}
          alt=""
          className="modal__icon-close"
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
