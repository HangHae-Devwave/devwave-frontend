import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { MainLayout } from '../styles/GlobalStyles';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: 'hee1',
    email: 'p1xell@kakao.com',
  });

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editedNickname, setEditedNickname] = useState(userInfo.nickname);
  const [editedEmail, setEditedEmail] = useState(userInfo.email);

  // 모달 열기/닫기 함수
  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  // 정보 저장 함수
  const saveEditedInfo = () => {
    setUserInfo({
      nickname: editedNickname,
      email: editedEmail,
    });
    closeEditModal();
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo>Your Profile</Logo>
          <EditButton onClick={openEditModal}>edit profile</EditButton>
        </Header>

        <Content>
          <UserInfoContainer>
            <UserInfo>닉네임 : {userInfo.nickname}</UserInfo>
            <UserInfo>이메일 : {userInfo.email}</UserInfo>
          </UserInfoContainer>

          <Header>
            <Logo>Your Post</Logo>
          </Header>

          {/* 정보 수정 모달 */}
          <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} style={ModalStyle}>
            <ModalContent>
              <InputLabel>닉네임:</InputLabel>
              <Input type="text" value={editedNickname} onChange={(e) => setEditedNickname(e.target.value)} />
              <InputLabel>이메일:</InputLabel>
              <Input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
              <ButtonGroup>
                <Button onClick={saveEditedInfo}>저장</Button>
                <Button onClick={closeEditModal}>닫기</Button>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        </Content>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #24deffe4;
  color: #494949;
  border-radius: 30px;
`;
const Logo = styled.h1`
  font-size: 1.6em;
`;
const EditButton = styled.button`
  background-color: #fff;
  color: #333;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transition: 0.3s ease;
    background-color: #494949;
    color: #24deffe4;
  }
`;
const Content = styled.div`
  padding: 20px;
`;
const UserInfoContainer = styled.div`
  margin: 20px 0px;
  margin-bottom: 70px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
const UserInfo = styled.div`
  font-size: 30px;
`;
const ModalStyle = {
  content: {
    maxWidth: '700px',
    height: '500px',
    margin: 'auto',
    borderRadius: '8px',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
`;
const InputLabel = styled.label`
  font-weight: bold;
`;
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 700px;
  margin-top: 250px;
`;
const Button = styled.button`
  background-color: #333;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Profile;
