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
import { Wrap, WrapItem } from '@chakra-ui/react'
// chakra toast
import { useToast } from '@chakra-ui/react'


const Home = () => {
  // 기본 title, content state
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // 게시물 CRUD관련 클래스 객체 생성
  const postManager = new PostManager();
  // 게시물 데이터 상태관리
  const [posts, setPosts] = useState([]);
  // 게시물 작성시 사용되는 state
  const [newTitle, setNewTitle] = useState(''); 
  const [newContent, setNewContent] = useState('');
  // 모달관련 함수 호출
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 토스트 메시지 관련 toast 생성
  const toast = useToast();
  const [currentUser, setCurrentUser] = useState('');

  // 컴포넌트가 마운트될 때, getPostList사용하여 게시물 목록을 가져옴
  useEffect(() => {
    const fetchPosts = async () => {
      const postList = await postManager.getPostList();
      setPosts(postList);
      if(localStorage.getItem('token')){
        setCurrentUser(localStorage.getItem('nickname'))
      }
    };
    fetchPosts();
  }, []);

  // 게시물 클릭시 게시물 상세페이지로 이동
  const navigate = useNavigate();
  const handlePostClick = (post) => {
    navigate(`/${post.id}`, { state: { post } });
  };

  // 새 게시글 작성 및 저장하는 함수
  const saveNewPost = async (position) => {
    const createdPost = await postManager.createPost(newTitle, newContent, currentUser);
    if(!currentUser){
      alert("로그인을 해야 글을 작성할 수 있습니다.")
      return
    }
    // 기존 게시물 목록에 새 게시글 추가 후 상태 업데이트
    setPosts((prevPosts) => [...prevPosts, createdPost]);
    // 모달 닫기 및 입력 폼 초기화
    onClose();
    setNewTitle('');
    setNewContent('');
    // 성공적인 게시물 작성 토스트 메시지 표시
    toast({
      title: '새로운 게시물 작성',
      description: '새 게시물이 성공적으로 작성되었습니다.',
      position: position,
      isClosable: true,
      status: 'success',
      duration: 4000,
    });
  };

  // 게시글 작성완료 토스트 관련
  const positions = [
    'top',
  ]

  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo>새로운 게시글을 작성해보세요!</Logo>
          <NewPostButton onClick={onOpen}>
              New Post
          </NewPostButton>
        </Header>

        <Content>
          {/* 게시물 목록 */}
          <Posts>
            {posts.map((post) => (
              <Post key={post.id} onClick={() => handlePostClick(post)}>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                <Author>작성자 : {post.author}</Author>
              </Post>
            ))}
          </Posts>

          {/* Chakra UI Modal */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered >
            <ModalOverlay />
            <ModalContent>

              <ModalHeader>Create a Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>

                {/* Modal Input */}
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter New Title"
                    />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Content</FormLabel>
                  <Input
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
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
                      <Button colorScheme="blue" mr={3} onClick={()=>saveNewPost(position)}>
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
  background-color: #24deffe4;
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
`;
const Posts = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
`;
const Post = styled.div`
  position: relative;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
`;
const PostTitle = styled.h3`
  font-size: 25px;
`;
const PostContent = styled.p`
  font-size: 17px;
`;
const Author = styled.p`
  position: absolute;
  bottom: 0;
  right: 20px;
  margin-top: 8px;
  font-style: italic;
  color: #555;
  font-size: 17px;
`;

export default React.memo(Home);
