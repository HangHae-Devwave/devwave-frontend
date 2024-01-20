import React, { useEffect, useState } from 'react';
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
import PostManager from '../server/postService';
import basicUserIcon from '../assets/basic-user-icon.svg';
import ProfileImg from '../components/ProfileImg';
import PostItem from '../components/PostItem';

const Profile = () => {
  // 모달 관련
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 토스트 관련 ( 스타일만 )
  const toast = useToast({
    position: 'top',
    isClosable: true,
    status: 'success',
    duration: 4000,
  });

  // 사용자 정보관련
  const [userInfo, setUserInfo] = useState({
    nickname: localStorage.getItem('nickname'),
    email: localStorage.getItem('email'),
  });
  const [editedNickname, setEditedNickname] = useState(userInfo.nickname);
  const [editedEmail, setEditedEmail] = useState(userInfo.email);
  const [uploadImgUrl, setUploadImgUrl] = useState(localStorage.getItem('profileImg') || basicUserIcon);

  // 정보 저장 함수 + 토스트 출력
  const saveEditedInfo = () => {
    // 로컬스토리지에 저장된 값 수정
    localStorage.setItem('nickname', editedNickname);
    localStorage.setItem('email', editedEmail);
    // 수정된 값을 불러와 state 관리
    setUserInfo({
      nickname: localStorage.getItem('nickname'),
      email: localStorage.getItem('email'),
    });
    // 모달창 닫음
    onClose();
    // 토스트 메시지 ( 로직만 )
    toast({
      title: `사용자 정보 수정`,
      description: '변경사항이 저장되었습니다.',
    });
  };

  // postList 데이터 관련
  const postManager = new PostManager();
  const [postList, setPostList] = useState([]);

  useEffect(()=>{
    const fetchMyPosts = async () => {
      await postManager.getPostList()
        .then((response) => {
          console.log(response);
          setPostList(response);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    }
    fetchMyPosts();
  }, [])

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
    modifyUserImg(localStorage.getItem('id'), uploadImgUrl);
    localStorage.setItem('profileImg', uploadImgUrl);
  };

  // 로그아웃 처리
  const logoutHandler = () => {
    localStorage.removeItem('token');
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
                  <input type="file" accept="image/*" onChange={imageUploadHandler}/>
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
            <TabPanel>
              <Posts>
                {postList
                  .filter((myPosts) => myPosts.author === localStorage.getItem('nickname'))
                  .map((myPosts) => (
                    <div key={myPosts.id}>
                      <PostItem key={myPosts.id} post={myPosts}></PostItem>
                    </div>
                  ))}
              </Posts>
            </TabPanel>
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
                <WrapItem >
                  <Button colorScheme="blue" mr={3} onClick={() => saveEditedInfo()}>
                    Save
                  </Button>
                </WrapItem>
              </Wrap>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
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

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  gap: 30px;
`;

const Header = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

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
