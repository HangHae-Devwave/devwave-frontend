import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../styles/GlobalStyles';
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import PostManager from '../server/postService';
import { useToast } from '@chakra-ui/react';
// import { useDisclosure } from '@chakra-ui/react-use-disclosure';

const Detail = () => {
  // Home.jsx에서 데이터 가져옴
  const location = useLocation().state;
  const postId = location.post.id;
  const postTitle = location.post.title;
  const postAuthor = location.post.author;
  const postContent = location.post.content;
  const [postComments, setPostComments] = useState(location.post.comment || [{}]);

  // 이전 페이지로 돌아가기 기능을 위한 navigate
  const navigate = useNavigate();
  const previousPageHandler = () => {
    navigate('/');
  };

  // 토스트 메시지 관련 toast 생성
  const toast = useToast({
    position: "top",
    isClosable: true,
    duration: 4000,
  });

  // 댓글 데이터 상태관리
  const [newReply, setNewReply] = useState('');
  const postManager = new PostManager();

  const replyChangeHandler = (e) => setNewReply(e.target.value)

  const saveNewReply = async () => {
    // 로그인한 사용자만 댓글 달 수 있도록 설정
    if (!localStorage.getItem('token')) {
      toast({
        title: '작성 오류',
        status: "error",
        description: '로그인을 해야 새 댓글 작성이 가능합니다.',
      });
      return;
    }
    if (!!newReply ) {
      const createdReply = await postManager.createReply(
        postId,
        newReply,
        localStorage.getItem('nickname'),
      );
      // 기존 댓글 목록에 새 댓글 추가 후 상태 업데이트
      setPostComments((postComments) => [...postComments, createdReply]);

      // localStorage에서 기존 데이터 가져오기
      const storedPosts = localStorage.getItem('posts');
      let posts = storedPosts ? JSON.parse(storedPosts) : [];

      // 기존 데이터에 새 댓글 추가
      posts = posts.map((post) => {
        if (post.id === postId) {
          // 해당 게시물의 comment 내부에 새로운 댓글 추가
          post.comment = post.comment ? [...post.comment, createdReply] : [createdReply];
          console.log(post.comment);
        }
        return post;
      });

      // 업데이트된 데이터를 다시 localStorage에 저장
      localStorage.setItem('posts', JSON.stringify(posts));
      setNewReply('');
      toast({
        title: '작성 성공',
        status: "success",
        description: '새 댓글이 성공적으로 작성되었습니다.',
      });
    } else {
      toast({
        title: '작성 오류',
        status: "error",
        description: '댓글창이 비어있습니다.',
      });
    }
  };

  // const { isOpen, onOpen, onClose } = useDisclosure();

  // // 게시글 삭제 버튼
  // const editButtonHandler = () => {
    
  // }
  // const deleteButtonHandler = () => {

  // }

  return (
    <MainLayout>
      <Container>
        {/* 이전으로 돌아가기 버튼 */}
        <PreviousPageGroup onClick={previousPageHandler}>
          <span className="material-symbols-outlined">undo</span>
          이전 페이지로 돌아가기
        </PreviousPageGroup>

        {/* 게시물 영역 */}
        <ContentWrapper>
          <Title>{postTitle}</Title>
          <Author>작성자: {postAuthor}</Author>
          <Content>{postContent}</Content>
          <ButtonGroup position="absolute" right={5} bottom={5}>
            <Button colorScheme='teal'>수정</Button>
            <Button ml={5} colorScheme='pink'>삭제</Button>
          </ButtonGroup>
        </ContentWrapper>

        {/* 댓글 영역 */}
        <CommentSection>
          <CommentTitle>댓글</CommentTitle>
          {postComments.map((comment) => (
            <Comment key={comment.replyId}>
              <CommentAuthor>{comment.replyAuthor}</CommentAuthor>
              <CommentText>{comment.replyContent}</CommentText>
            </Comment>
          ))}
        </CommentSection>

        <InputSection>
          <Input placeholder='댓글을 작성해보세요.' size='lg' 
            onChange={replyChangeHandler}
            value={newReply}/>
          <Button ml={5} h="45px" colorScheme='blue'
            onClick={saveNewReply}>
              작성하기
          </Button>
        </InputSection>
      </Container>
    </MainLayout>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
const PreviousPageGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;
const ContentWrapper = styled.div`
  position: relative;
  background-color: #e8e8e8;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  padding-bottom: 80px;
`;
const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
`;
const Author = styled.p`
  margin-top: 10px;
  font-style: italic;
  color: #555;
  font-size: 16px;
`;
const Content = styled.p`
  font-size: 18px;
`;
const CommentSection = styled.div`
  margin-top: 20px;
`;
const CommentTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;
const Comment = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;
const CommentAuthor = styled.p`
  font-weight: bold;
  font-size: 20px;
`;
const CommentText = styled.p`
  font-size: 17px;
`;
const InputSection = styled.div`
  position: fixed;
  width: 800px;
  height: 50px;
  bottom: 10px;
  border-radius: 10px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 1;
  padding: 0px 5px;
`

export default React.memo(Detail);
