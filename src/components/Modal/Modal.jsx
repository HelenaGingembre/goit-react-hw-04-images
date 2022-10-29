import { ModalContainer, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggle, children }) => {
  useEffect(() => {
    const handleKeyDown = event => (event.code === 'Escape' ? toggle() : null);

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggle]);

  const clickOnBackdrop = event => {
    // console.log('event', event);
    if (event.target === event.currentTarget) {
      toggle();
    }
  };

  return createPortal(
    <Overlay onClick={clickOnBackdrop}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
  children: PropTypes.element,
};
