import React from 'react';
import styled from 'styled-components';
import errorIcon from '../../assets/error-circle.svg';
// import warningIcon from '../../assets/warning-circle.svg';
import successIcon from '../../assets/success-circle.svg';
import { useAlert } from '../../contexts/AlertProvider';

const AlertIcon = () => {
  let icon;
  const { alertVal } = useAlert();

  switch (alertVal.status) {
    case 'error':
      icon = errorIcon;
      break;
    case 'success':
      icon = successIcon;
      break;
    case 'warning':
      // icon = warningIcon;
      break;
    default:
  }
  return (
    <IconWrapper>
      <img src={icon} alt="" />
    </IconWrapper>
  );
};

const IconWrapper = styled.div`
  margin-right: 0.8rem;
  display: flex;
  align-items: center;

  & > img {
    width: 1.6vw;
  }
`;

export default AlertIcon;
