import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeVisibility } from '../../store/visibilitySlice';

function Modal({ children }) {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.visibility);

  const closeModal = () => {
    dispatch(changeVisibility());
  };

  return (
    <div className={`modal ${isVisible ? 'active' : ''}`}>
      <div className="modal__content">
        {children}
        <button
          type="button"
          className="modal__button-close"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
