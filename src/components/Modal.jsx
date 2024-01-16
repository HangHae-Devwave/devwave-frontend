import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './Button';

const Modal = ({ type, onClose, children }) => {
  const ModalWrapper = SmallWrapper;
  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <p>{children}</p>
        <CloseButton size="small" onClick={onClose}>
          Close
        </CloseButton>
      </ModalWrapper>
    </Overlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const SmallWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const CloseButton = styled(Button)`
  float: right;
`;

export default Modal;
