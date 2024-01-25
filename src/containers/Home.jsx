import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { createPost, getPostList } from '../server/postService';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../styles/GlobalStyles';
import { useDisclosure } from '@chakra-ui/react-use-disclosure'; // chakra modal
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
import { useToast } from '@chakra-ui/react'; // chakra toast
import { Radio, RadioGroup } from '@chakra-ui/react'; // chakra radio
import { Stack } from '@chakra-ui/react';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/react'; // chakra skeleton
import { Box } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import PostItem from '../components/PostItem';
import { useQueryClient } from 'react-query';

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');

  // 게시물 데이터 상태관리
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [ref, inView] = useInView();

  const fetchPosts = useCallback(async () => {
    if (posts.length % 5 === 0) {
      setIsLoading(true);
      const response = await getPostList(page);
      setPosts((prevState) => [...prevState, ...response]);
      setIsLoading(false);
    }
  }, [page]);

  // fetchPosts이 바뀔 때마다 함수 실행
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !isLoading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLoading]);

  // 모달관련 함수 호출
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 게시물 작성시 사용되는 state
  const [inputVal, setInputVal] = useState({ type: '', title: '', content: '' });
  // 토스트 메시지 관련 toast 생성
  const toast = useToast({
    position: 'top',
    isClosable: true,
    duration: 4000,
  });

  const handlePostClick = (post) => navigate(`/${post.id}`, { state: { post } });

  // 새 게시글 작성 및 저장하는 함수
  const saveNewPost = async () => {
    if (!localStorage.getItem('tokens')) {
      toast({
        title: '작성 오류',
        status: 'error',
        description: '로그인을 하셔야 새 게시글 작성이 가능합니다.',
      });
      return;
    }
    if (!!inputVal.title && !!inputVal.content) {
      const createdPost = await createPost(inputVal.type, inputVal.title, inputVal.content, user.id, user.nickname);
      // 기존 게시물 목록에 새 게시글 추가 후 상태 업데이트
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
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
      .map((post, idx) => (
        <React.Fragment key={idx}>
          {posts.length - 1 === idx ? (
            <PostItem ref={ref} onClick={() => handlePostClick(post)} post={post} isLoading={isLoading}></PostItem>
          ) : (
            <PostItem onClick={() => handlePostClick(post)} post={post} isLoading={isLoading}></PostItem>
          )}
        </React.Fragment>
      ));
  };

  // 분류자로 분류된 게시물들 출력시켜주는 함수
  const renderPosts = (type) => {
    return (
      <>
        <Posts>
          {type === 'all'
            ? posts.map((post, idx) => (
                <React.Fragment key={idx}>
                  {posts.length - 1 === idx ? (
                    // {isLoading && <Loading />}
                    <PostItem
                      ref={ref}
                      onClick={() => handlePostClick(post)}
                      post={post}
                      isLoading={isLoading}></PostItem>
                  ) : (
                    <PostItem onClick={() => handlePostClick(post)} post={post} isLoading={isLoading}></PostItem>
                  )}
                </React.Fragment>
              ))
            : typeClassifier(posts, type)}
          {/* 로딩 중일 때 Skeleton UI 표시*/}
          {/* 최초엔 5 개의 스켈레톤 표시 */}
          {isLoading &&
            posts.length === 0 &&
            Array.from({ length: 5 }, (_, index) => (
              <Box key={index} padding="10" boxShadow="lg" bg="#f7fbff">
                <SkeletonCircle size="8" />
                <SkeletonText mt="8" noOfLines={4} spacing="4" skeletonHeight="2" />
              </Box>
            ))}
          {/* 그 이후에는 한 개의 스켈레톤만 보여주기 */}
          {isLoading && posts.length > 1 && (
            <Box padding="10" boxShadow="lg" bg="#f7fbff">
              <SkeletonCircle size="8" />
              <SkeletonText mt="8" noOfLines={4} spacing="4" skeletonHeight="2" />
            </Box>
          )}
        </Posts>
      </>
    );
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo>새로운 게시글을 작성해보세요!</Logo>
          <Button backgroundColor={'skyblue'} color={'white'} onClick={onOpen}>
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
              <TabPanel>{renderPosts('all')}</TabPanel>

              {/* Board */}
              <TabPanel>{renderPosts('board')}</TabPanel>

              {/* Question */}
              <TabPanel>{renderPosts('question')}</TabPanel>
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
                  <Input value={inputVal.title} onChange={titleChangeHandler} placeholder="Enter New Title" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Type</FormLabel>
                  <RadioGroup value={inputVal.type} onChange={(e) => typeChangeHandler(e)}>
                    <Stack direction="row">
                      <Radio value="board" checked ml={20}>
                        Board
                      </Radio>
                      <Radio value="question" ml={7}>
                        Question
                      </Radio>
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
                    <Button colorScheme="blue" mr={3} onClick={() => saveNewPost()}>
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
