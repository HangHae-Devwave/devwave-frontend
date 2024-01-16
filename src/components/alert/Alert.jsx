import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAlert } from '../../contexts/AlertProvider';

const Alert = ({ status = 'error', children }) => {
  const { alertVal, hideAlert } = useAlert();
  let AlertBox;

  // status에 따라 스타일 변경
  switch (status) {
    case 'error':
      AlertBox = ErrorBox;
      break;
    case 'success':
      AlertBox = SuccessBox;
      break;
    case 'warning':
      AlertBox = WarningBox;
      break;
    default:
      AlertBox = InfoBox;
  }

  // 2초 뒤에 사라지는 Alert
  useEffect(() => {
    const timeoutId = setTimeout(() => hideAlert(), 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [alertVal.isOn, hideAlert]);

  return (
    <AlertWapper>
      <AlertBox visible={alertVal.isOn.toString()}>{children}</AlertBox>
    </AlertWapper>
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

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const AlertWapper = styled.div`
  width: 100%;
  position: absolute;
  top: 1vh;
  display: flex;
  justify-content: center;
`;

const BoxStyles = css`
  display: flex;
  align-items: center;
  width: 35vw;
  padding: 10px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  font-weight: bolder;
`;

const ErrorBox = styled.div`
  ${BoxStyles}
  background-color: rgba(240, 173, 173, 0.8);
`;
const SuccessBox = styled.div`
  ${BoxStyles}
  background-color: rgba(208, 245, 215, 0.8);
`;
const WarningBox = styled.div`
  ${BoxStyles}
  background-color: rgba(251, 236, 204, 0.8);
`;
const InfoBox = styled.div`
  ${BoxStyles}
  background-color: rgba(197, 226, 246,0.8);
`;

export default Alert;
