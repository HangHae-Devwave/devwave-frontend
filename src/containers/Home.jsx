import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PostManager from '../server/postService';
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
import { useInView } from 'react-intersection-observer';
import PostItem from '../components/PostItem';
import Loading from '../components/Loading';

const Home = () => {
  const navigate = useNavigate();

  // 게시물 CRUD관련 클래스 객체 생성
  const postManager = new PostManager();

  // 게시물 데이터 상태관리
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [ref, inView] = useInView();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const response = await postManager.getPostList(page);
    setPosts((prevState) => [...prevState, ...response]);
    setIsLoading(false);
    console.log(page);
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
  const [inputVal, setInputVal] = useState({ type: 'board', title: '', content: '' });

  // 토스트 메시지 관련 toast 생성
  const toast = useToast();
  const handlePostClick = (post) => navigate(`/${post.id}`, { state: { post } });

  // 새 게시글 작성 및 저장하는 함수
  const saveNewPost = async (position) => {
    if (!localStorage.getItem('token')) {
      alert('로그인을 해야 글을 작성할 수 있습니다.');
      return;
    }
    if (!!inputVal.title && !!inputVal.content) {
      const createdPost = await postManager.createPost(
        inputVal.title,
        inputVal.content,
        JSON.parse(localStorage.getItem('user')).nickname
      );
      // 기존 게시물 목록에 새 게시글 추가 후 상태 업데이트
      setPosts('posts', [...posts, createdPost]);
      // 모달 닫기 및 입력 폼 초기화
      onClose();
      setInputVal({ type: 'board', title: '', content: '' });
      // 성공적인 게시물 작성 토스트 메시지 표시
      toast({
        title: '새로운 게시물 작성',
        description: '새 게시물이 성공적으로 작성되었습니다.',
        position: position,
        isClosable: true,
        status: 'success',
        duration: 4000,
      });
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  // 게시글 작성완료 토스트 관련
  const positions = ['top'];
  // const typeChangeHandler = (type) => setInputVal({ ...inputVal, type });
  const titleChangeHandler = (e) => setInputVal({ ...inputVal, title: e.target.value });
  const contentChangeHandler = (e) => setInputVal({ ...inputVal, content: e.target.value });

  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo>새로운 게시글을 작성해보세요!</Logo>
          <NewPostButton onClick={onOpen}>New Post</NewPostButton>
        </Header>

        <Content>
          {/* 게시물 목록 */}
          <Posts>
            {posts.map((post, idx) => (
              <React.Fragment key={idx}>
                {posts.length - 1 === idx ? (
                  // {isLoading && <Loading />}
                  <PostItem ref={ref} onClick={() => handlePostClick(post)} post={post}></PostItem>
                ) : (
                  <PostItem onClick={() => handlePostClick(post)} post={post}></PostItem>
                )}
              </React.Fragment>
            ))}
          </Posts>

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
                  {positions.map((position, i) => (
                    <WrapItem key={i}>
                      <Button colorScheme="blue" mr={3} onClick={() => saveNewPost(position)}>
                        Save
                      </Button>
                    </WrapItem>
                  ))}
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

const NewPostButton = styled.button`
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
