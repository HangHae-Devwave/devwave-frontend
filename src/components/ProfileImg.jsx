import React from 'react';
import styled from 'styled-components';
import basicUserIcon from '../assets/basic-user-icon.svg';

const ProfileImg = ({ src, size = '30px', onClick }) => {
  return (
    <ImgBox size={size} onClick={onClick}>
      <img src={src || basicUserIcon} alt="" />
    </ImgBox>
  );
};

const ImgBox = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 70%;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: 100%;
  }
`;

export default ProfileImg;
