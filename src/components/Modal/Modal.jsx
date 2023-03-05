import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handlePressEsc);
    return () => {
      window.removeEventListener('keydown', handlePressEsc);
    };
  });

  const handlePressEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
