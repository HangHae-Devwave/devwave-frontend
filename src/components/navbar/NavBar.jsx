import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImg from '../ProfileImg';
import logo from '../../assets/devwave-logo.png';
import { useQueryClient } from 'react-query';

const NavBar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('tokens');
  const profileImg = queryClient.getQueryData('user') ? queryClient.getQueryData('user').profileImg : '';

  useEffect(() => {
    // localStorage에서 토큰을 가져와서 로그인 상태 확인
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, [token]);

  // Navbar 로고 클릭시 -> Home(/)으로 이동
  const logoClickHandler = () => {
    navigate('/');
  };

  // Navbar 프로필닉네임 클릭시 -> Profile(/Profile)으로 이동
  const profileClickHandler = () => {
    navigate('/profile');
  };

  return (
    <NavbarContainer>
      <Navbar>
        <img src={logo} alt="" onClick={() => logoClickHandler()} />
        <NavBox>
          {isLoggedIn ? (
            // 로그인 상태일 때, 프로필과 로그아웃 버튼 표시
            <ProfileImg src={profileImg} onClick={profileClickHandler} />
          ) : (
            // 로그인 상태가 아닐 때, 로그인과 회원가입 버튼 표시
            <>
              <TextButton onClick={() => navigate('/login')}>로그인</TextButton>
              <TextButton onClick={() => navigate('/signup')}>회원가입</TextButton>
            </>
          )}
        </NavBox>
      </Navbar>
    </NavbarContainer>
  );
};

export default React.memo(NavBar);

const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 15px rgba(175, 175, 175, 0.5);

  & > img {
    width: 10vw;
  }
`;

const NavBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const TextButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text.common};
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
`;
