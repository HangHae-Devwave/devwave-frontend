import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../styles/GlobalStyles';
import PostManager from '../server/postService';
// chakra modal
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
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
import { Wrap, WrapItem } from '@chakra-ui/react';
// chakra toast
import { useToast } from '@chakra-ui/react';
// chakra radio
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import PostItem from '../components/PostItem';
import Loading from '../components/Loading';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const Home = () => {
  // --- 희원 ---
  // 게시물 클릭시 게시물 상세페이지로 이동
  const navigate = useNavigate();
  // 모달관련 함수 호출
  const { isOpen, onOpen, onClose } = useDisclosure();
  // --- 민지 ---
  // 게시물 CRUD관련 클래스 객체 생성
  const postManager = new PostManager();
  // 게시물 작성시 사용되는 state
  const [inputVal, setInputVal] = useState({ type: '', title: '', content: '' });
  // 게시물 데이터 상태관리
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // 토스트 메시지 관련 toast 생성
  const toast = useToast({
    position: "top",
    isClosable: true,
    duration: 4000,
  });

  // 민지님이 캐시 만드려고 시도한 코드
  // 초기 데이터를 가져오는 방식
  useEffect(() => {
    // 서버에서 데이터를 가져와서 로컬 상태에 설정하는 비동기 함수
    const fetchPosts = async () => {
      // localStorage에 저장된 posts 데이터가 있다면
      // 서버 호출하지 않고 localStorage 데이터를 posts에 저장
      if (!!localStorage.getItem('posts')) {
        setPosts(JSON.parse(localStorage.getItem('posts')));
      } else {
      // 서버에서 데이터를 가져오는 비동기 요청
      await postManager
        .getPostList()
        .then((response) => {
          localStorage.setItem('posts', JSON.stringify(response));
          setPosts(response);
        })
        .catch((error) => {
          console.error(error);
        });
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행되도록 보장

  const handlePostClick = (post) => {
    navigate(`/${post.id}`, { state: { post } });
    console.log(post);
  };

  // 새 게시글 작성 및 저장하는 함수
  const saveNewPost = async () => {
    if (!localStorage.getItem('token')) {
      toast({
        title: '작성 오류',
        status: 'error',
        description: '로그인을 하셔야 새 게시글 작성이 가능합니다.',
      });
      return;
    }
    // --- 민지 ---
    if (!!inputVal.title && !!inputVal.content) {
      const createdPost = await postManager.createPost(
        inputVal.type,
        inputVal.title,
        inputVal.content,
        localStorage.getItem('nickname')
      );
      // 기존 게시물 목록에 새 게시글 추가 후 상태 업데이트
      setPosts((prevPosts) => [...prevPosts, createdPost]);
      const localStoragePosts = JSON.parse(localStorage.getItem('posts')) || [];
      const newLocalStoragePosts = [...localStoragePosts, createdPost];
      localStorage.setItem('posts', JSON.stringify(newLocalStoragePosts));
      // 모달 닫기 및 입력 폼 초기화
      onClose();
      setInputVal({ type: '', title: '', content: '' });
      // 성공적인 게시물 작성 토스트 메시지 표시
      toast({
        title: '작성 성공',
        status: 'success',
        description: '새 게시물이 성공적으로 작성되었습니다.',
      });
    } else {
      toast({
        title: '작성 오류',
        status: 'error',
        description: '제목과 내용 모두 입력해주세요.',
      });
    }
  };

  const typeChangeHandler = (type) => setInputVal({ ...inputVal, type: type });
  const titleChangeHandler = (e) => setInputVal({ ...inputVal, title: e.target.value });
  const contentChangeHandler = (e) => setInputVal({ ...inputVal, content: e.target.value });

  // 게시물 타입에 따라 출력을 다르게 해주는 분류자
  const typeClassifier = (posts, type) => {
    return posts
      .filter((post) => post.type === type)
      .map((post)=>(
        <div key={post.id}>
          <PostItem
            key={post.id} 
            onClick={() => handlePostClick(post)}
            post={post}>
          </PostItem>
        </div>
      ))
    };

  // 분류자로 분류된 게시물들 출력시켜주는 함수
  const renderPosts = (type) => {
    return (
      <>
        {isLoading && <Loading />}
        {!isLoading && (
          <Posts>
            {type === "all"
              ? posts.map((post) => (
                  <div key={post.id}>
                    <PostItem
                      key={post.id}
                      onClick={() => handlePostClick(post)}
                      post={post}
                    />
                  </div>
                ))
              : typeClassifier(posts, type)}
          </Posts>
        )}
    </>
      )
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo>새로운 게시글을 작성해보세요!</Logo>
          <Button 
            backgroundColor={"skyblue"} 
            color={"white"} 
            onClick={onOpen}>
              New Post
          </Button>
        </Header>

        <Content>
        <Tabs isFitted variant="soft-rounded" colorScheme="blue">
          <TabList mb={50}>
            <Tab>All</Tab>
            <Tab>Board</Tab>
            <Tab>Question</Tab>
          </TabList>

          <TabPanels>
            {/* All */}
            <TabPanel>
              {renderPosts("all")}
            </TabPanel>

            {/* Board */}
            <TabPanel>
              {renderPosts("board")}
            </TabPanel>

            {/* Question */}
            <TabPanel>
              {renderPosts("question")}
            </TabPanel>
          </TabPanels>
        </Tabs>
          

          {/* Chakra UI Modal */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>

                {/* Modal Input */}
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input 
                    value={inputVal.title} 
                    onChange={titleChangeHandler} 
                    placeholder="Enter New Title" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Type</FormLabel>
                  <RadioGroup value={inputVal.type} onChange={(e)=>typeChangeHandler(e)}>
                    <Stack direction='row'>
                      <Radio value='board' checked ml={20}>Board</Radio>
                      <Radio value='question' ml={7}>Question</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Content</FormLabel>
                  <Input
                    value={inputVal.content}
                    onChange={contentChangeHandler}
                    placeholder="Enter New Content"
                    h={400}
                  />
                </FormControl>
              </ModalBody>

              {/* Modal Button */}
              <ModalFooter>
                <Wrap>
                    <WrapItem>
                      <Button 
                        colorScheme="blue" 
                        mr={3} 
                        onClick={() => saveNewPost()}>
                          Save
                      </Button>
                    </WrapItem>
                </Wrap>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>

            </ModalContent>
          </Modal>
        </Content>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: #494949;
  border-radius: 30px;
`;
const Logo = styled.h1`
  font-size: 1.6em;
`;
const Content = styled.div`
  padding: 20px;
  & > img {
    margin: 0 auto;
  }
`;
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  gap: 30px;
`;

export default React.memo(Home);
