import React from 'react';
import styled from 'styled-components';

const Button = ({ size, color, children, ...props }) => {
  return (
    <StyledButton size={size} color={color} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: ${(props) => getButtonPadding(props.size)};
  width: ${(props) => getButtonWidth(props.size)};
  background-color: ${(props) => getButtonColor(props)};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
  font-weight: bolder;

  &:hover {
    background-color: ${(props) => getButtonHoverColor(props)};
  }
`;

const getButtonColor = (props) => {
  switch (props.color) {
    case 'primary':
      return props.theme.colors.button.primary;
    default:
      return props.theme.colors.button.primary;
  }
};

const getButtonHoverColor = (color) => {
  switch (color) {
    case 'primary':
      return 'rgba(0, 125, 250, 0.8)';
    default:
      return 'rgba(0, 125, 250, 0.8)';
  }
};

const getButtonWidth = (size) => {
  switch (size) {
    case 'small':
      return '5vw';
    case 'medium':
      return '8vw';
    case 'full':
      return '100%';
    default:
      return '8vw';
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
