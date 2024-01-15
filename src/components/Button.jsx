import React from 'react';
import styled from 'styled-components';

const Button = ({ size, children, ...props }) => {
  return (
    <StyledButton size={size} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: ${(props) => getButtonPadding(props.size)};
  width: ${(props) => getButtonWidth(props.size)};
  background-color: ${(props) => (props.primary ? props.theme.colors.primary : 'transparent')};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  font-weight: bolder;

  &:hover {
    background-color: ${(props) => (props.primary ? 'rgba(0, 125, 250, 0.8)' : 'transparent')};
  }
`;

const getButtonWidth = (size) => {
  switch (size) {
    case 'small':
      return '8px 16px';
    case 'medium':
      return '12px 24px';
    case 'full':
      return '100%';
    default:
      return '12px 24px';
  }
};

const getButtonPadding = (size) => {
  switch (size) {
    case 'small':
      return '8px 16px';
    case 'medium':
      return '12px 24px';
    case 'full':
      return '12px 0';
    default:
      return '12px 24px';
  }
};

export default Button;
