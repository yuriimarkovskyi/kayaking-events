import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeVisibilityAction } from '../../store/visibilityReducer';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.5);

  &.active {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    position: relative;
    min-width: 400px;
    padding: 30px;
    border-radius: 10px;
    background: white;
  }

  .icon-close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
  }
`;

function Modal({ children }) {
  const dispatch = useDispatch();
  const visibility = useSelector((state) => state.visibility.visibility);

  const handleCloseModal = () => {
    dispatch(changeVisibilityAction());
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      dispatch(changeVisibilityAction());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <StyledModal
      className={visibility && 'active'}
      onKeyDown={handleKeyDown}
    >
      <div className="content">
        {children}
        <input
          type="image"
          src={`${window.location.origin}/images/icons/icon-close.png`}
          alt=""
          className="icon-close"
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
        />
      </div>
    </StyledModal>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
