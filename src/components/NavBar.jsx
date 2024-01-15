import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {

  const navigate = useNavigate()

  // Navbar 로고 클릭시 -> Home(/)으로 이동
  const logoClickHandler = () => {
    navigate('/')
  }

  // Navbar 프로필닉네임 클릭시 -> Profile(/Profile)으로 이동
  const profileClickHandler = () => {
    navigate('/profile')
  }

  return (
    <NavbarContainer>
      <Navbar>
        {/* 로고옆에 파도아이콘있어도 나쁘지않을 것 같은데 일단 텍스트만 폰트입혀서.. */}
        <Logo 
          onClick={()=>logoClickHandler()}>
            Devwave
        </Logo>
        <ProfileContainer>
          {/* 미니프로필에는 일단 사진없이 닉네임만 들어가도록 구현 */} 
          <ProfileNickName 
            onClick={()=>profileClickHandler()}>
              Heewon
          </ProfileNickName>
          <ProfileDropdown>
            <span 
              className="material-symbols-outlined" 
              onClick={()=>profileClickHandler()}>
              expand_more
            </span>
          </ProfileDropdown>
        </ProfileContainer>
      </Navbar>
    </NavbarContainer>

  ) 
};

export default React.memo(NavBar);

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`
const Navbar = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 120px;
  flex-shrink: 0;
  margin: 20px 0px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
`
const Logo = styled.span`
  font-size: 40px;
  font-family: "Lemon", serif;
  font-weight: 700;
  font-style: normal;
  cursor: pointer;
`
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* background-color: lightgray; */
  width: 130px;
  height: 40px;
  text-align: center;
  border-radius: 20px;
  border: 3px solid lightgray;
  padding: 0px 10px;
`
const ProfileNickName = styled.button`
  margin-left: 5px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  `
const ProfileDropdown = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`