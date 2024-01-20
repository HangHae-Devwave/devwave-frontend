import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { MainLayout } from '../styles/GlobalStyles';
import { modifyUserImg } from '../server/userService';
// import PostManager from '../server/postService';
import basicUserIcon from '../assets/basic-user-icon.svg';
import ProfileImg from '../components/ProfileImg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  // 모달 관련
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = JSON.parse(localStorage.getItem('user'));

  // 토스트 관련
  const toast = useToast();
  const positions = ['top'];

  // 사용자 정보관련
  const [userInfo, setUserInfo] = useState({
    nickname: user.nickname,
    email: user.email,
  });
  const [editedNickname, setEditedNickname] = useState(userInfo.nickname);
  const [editedEmail, setEditedEmail] = useState(userInfo.email);
  const [uploadImgUrl, setUploadImgUrl] = useState(user.profileImg || basicUserIcon);

  // 정보 저장 함수 + 토스트 출력
  const saveEditedInfo = (position) => {
    // 로컬스토리지에 저장된 값 수정
    localStorage.setItem('nickname', editedNickname);
    localStorage.setItem('email', editedEmail);
    // 수정된 값을 불러와 state 관리
    setUserInfo({
      nickname: user.nickname,
      email: user.email,
    });
    // 모달창 닫음
    onClose();
    // 토스트 메시지
    toast({
      title: `사용자 정보 수정`,
      description: '변경사항이 저장되었습니다.',
      position: position,
      isClosable: true,
      status: 'success',
      duration: 4000,
    });
  };

  // post 데이터 관련
  // const postManager = new PostManager();

  // 프로필 이미지 업로드 로직
  const imageUploadHandler = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };

  const modifyProfileImgHandler = () => {
    // const formData = new FormData();
    // formData.append('image', uploadImgUrl);
    modifyUserImg(user.id, uploadImgUrl);
    localStorage.setItem('profileImg', uploadImgUrl);
  };

  // 로그아웃 처리
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    // setIsLoggedIn(false);
  };

  return (
    <MainLayout>
      <Container>
        <Header>안녕하세요, {userInfo.nickname}님!</Header>
        <HR />
        <Tabs isFitted variant="soft-rounded" colorScheme="blue">
          <TabList mb={50}>
            <Tab>Your Profile</Tab>
            <Tab>Your Post</Tab>
          </TabList>

          <TabPanels>
            {/* Your Profile */}
            <TabPanel h={400}>
              <UserInfoContainer>
                <ProfileBox>
                  <ProfileImg src={uploadImgUrl} size="100px" />
                  <input type="file" accept="image/*" onChange={imageUploadHandler} />
                  <button onClick={modifyProfileImgHandler}>저장</button>
                </ProfileBox>
                <InfoBox>
                  <UserInfo>닉네임 : {userInfo.nickname}</UserInfo>
                  <UserInfo>이메일 : {userInfo.email}</UserInfo>
                </InfoBox>
              </UserInfoContainer>
              <EditButton onClick={onOpen}>edit profile</EditButton>
              <button onClick={logoutHandler}>로그아웃</button>
            </TabPanel>

            {/* Your Post */}
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>

        {/* Chakra UI Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit your profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Modal Input */}
              <FormControl>
                <FormLabel>Nickname</FormLabel>
                <Input
                  value={editedNickname}
                  onChange={(e) => setEditedNickname(e.target.value)}
                  placeholder="Enter your nickname"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>
            </ModalBody>

            {/* Modal Button */}
            <ModalFooter>
              <Wrap>
                {positions.map((position, i) => (
                  <WrapItem key={i}>
                    <Button colorScheme="blue" mr={3} onClick={() => saveEditedInfo(position)}>
                      Save
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
      {/* 정보 수정 모달 */}
      {/* // <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} style={ModalStyle}>
      //   <ModalContent>
      //     <InputLabel>닉네임:</InputLabel>
      //     <Input type="text" value={editedNickname} onChange={(e) => setEditedNickname(e.target.value)} />
      //     <InputLabel>이메일:</InputLabel>
      //     <Input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
      //     <ButtonGroup>
      //       <Button onClick={saveEditedInfo}>저장</Button>
      //       <Button onClick={closeEditModal}>닫기</Button>
      //     </ButtonGroup>
      //   </ModalContent>
      // </Modal> */}
    </MainLayout>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const HR = styled.hr`
  margin: 30px 0px;
`;

const Header = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;
// const Header = styled.div`
//   box-sizing: border-box;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 50px;
//   background-color: #24deffe4;
//   color: #494949;
//   border-radius: 30px;
// `;
// const Logo = styled.h1`
//   font-size: 1.6em;
// `;

const EditButton = styled.button`
  background-color: #fff;
  color: #494949;
  padding: 8px 16px;
  border: 2px solid #bee3f8;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 30px;
  &:hover {
    transition: 0.3s ease;
    background-color: white;
  }
`;

const UserInfo = styled.div`
  font-size: 25px;
  display: flex;
  flex-direction: row;
`;

const UserInfoContainer = styled.div`
  margin: 20px 0px;
  margin-bottom: 70px;
  display: flex;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Profile;
