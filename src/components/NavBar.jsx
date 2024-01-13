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
    <NavContainer>
      <Navbar>
        {/* 로고옆에 파도아이콘있어도 나쁘지않을 것 같은데 일단 텍스트만 폰트입혀서.. */}
        <Logo onClick={()=>logoClickHandler()}>Devwave</Logo>
        <MiniProfile>
          {/* 미니프로필에는 일단 사진없이 닉네임만 들어가도록 구현 */} 
          <NickName>User</NickName>
          <ProfileDropdown>
            <span className="material-symbols-outlined" onClick={()=>profileClickHandler()}>
              expand_more
            </span>
          </ProfileDropdown>
        </MiniProfile>
      </Navbar>
    </NavContainer>

  ) 
};

export default React.memo(NavBar);

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1100px;
  height: 80px;
  flex-shrink: 0;
  margin-top: 15px;
  padding: 0px 50px 20px;
  border-bottom: 1px solid lightgray;
`
const Logo = styled.span`
  font-size: 30px;
  font-family: "Lemon", serif;
  font-weight: 700;
  font-style: normal;
`
const MiniProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: lightgray;
  width: 130px;
  height: 50px;
  text-align: center;
  border-radius: 20px;
  padding: 0px 10px;
`
const NickName = styled.span`
  margin-left: 20px;
  font-weight: 600;
  cursor: pointer;
  `
const ProfileDropdown = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`