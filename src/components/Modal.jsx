import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const Modal = ({ type, onClose, children }) => {
  const [portalRoot] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(portalRoot);

    return () => {
      document.body.removeChild(portalRoot);
    };
  }, [portalRoot]);

  const renderModalContent = () => {
    switch (type) {
      case 'modal':
        return (
          <ModalWrapper>
            {children}
            <button onClick={onClose}>Close</button>
          </ModalWrapper>
        );
      case 'alert':
        return (
          <ModalWrapper>
            {children}
            <button onClick={onClose}>OK</button>
          </ModalWrapper>
        );
      default:
        return null;
    }
  };

  return createPortal(<Overlay>{renderModalContent()}</Overlay>, portalRoot);
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Modal;
