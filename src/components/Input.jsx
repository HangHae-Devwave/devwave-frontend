import React from 'react';
import styled from 'styled-components';

const Input = ({ type, placeholder, icon, value, onChange, isValid }) => {
  return (
    <InputBox
      icon={icon}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={isValid ? null : 'not--valid'}
    />
  );
};

const InputBox = styled.input`
  width: 100%;
  padding: 17px 30px;
  border: 2px solid transparent;
  border-radius: 10px;
  background-color: #f5f5f7;
  background-repeat: no-repeat;

  &::-webkit-input-placeholder {
    background-image: url(${(props) => props.icon});
    background-size: contain;
    background-position: 1px center;
    background-repeat: no-repeat;
    padding-left: 40px;
    text-indent: 0;
  }

  &:focus {
    background-image: none;
    outline: none;
    border-color: #80befc;
    box-shadow: 0 0 5px rgba(128, 190, 252, 0.5);
    background-color: transparent;
  }

  &.not--valid {
    border-color: rgb(238, 145, 136);
    box-shadow: 0 0 5px rgba(238, 145, 136, 0.5);
  }
`;
export default Input;
