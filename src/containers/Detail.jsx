import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../styles/GlobalStyles';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { createReply, deletePost, updatePost } from '../server/postService';
import { useQueryClient } from 'react-query';
import useInput from '../hooks/useInput';

const Detail = () => {
  // Home.jsx에서 데이터 가져옴
  const location = useLocation().state;
  const postId = location.post.id;
  const postAuthor = location.post.author;
  const [postTitle, setPostTitle] = useState(location.post.title);
  const [postContent, setPostContent] = useState(location.post.content);
  const [postComments, setPostComments] = useState(location.post.comment || [{}]);
  const [modifyTitle, onChangeModifyTitle] = useInput(postTitle);
  const [modifyContent, onChangeModifyContent] = useInput(postContent);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');

  // 로그인 여부 체크
  const checkLoginStatus = () => {
    return !!localStorage.getItem('tokens') ? true : false;
  };

  // 이전 페이지로 돌아가기 기능을 위한 navigate
  const navigate = useNavigate();
  const previousPageHandler = () => navigate('/');

  // 토스트 메시지 관련 toast 생성
  const toast = useToast({
    position: 'top',
    isClosable: true,
    duration: 4000,
  });

  // 댓글 데이터 상태관리
  const [newReply, setNewReply] = useState('');
  const replyChangeHandler = (e) => setNewReply(e.target.value);
  const saveNewReply = async () => {
    // 로그인한 사용자만 댓글 달 수 있도록 설정
    if (!checkLoginStatus) {
      toast({
        title: '작성 오류',
        status: 'error',
        description: '로그인을 해야 새 댓글 작성이 가능합니다.',
      });
      return;
    }
    if (!!newReply) {
      const createdReply = await createReply(postId, user.nickname, newReply);
      // 기존 댓글 목록에 새 댓글 추가 후 상태 업데이트
      setPostComments((postComments) => [...postComments, createdReply]);
      setNewReply('');

      toast({
        title: '작성 성공',
        status: 'success',
        description: '새 댓글이 성공적으로 작성되었습니다.',
      });
    } else {
      toast({
        title: '작성 오류',
        status: 'error',
        description: '댓글창이 비어있습니다.',
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  // 게시글 삭제 버튼 핸들러
  const deleteButtonHandler = async () => {
    if (!checkLoginStatus) {
      // 삭제 실패 : 비로그인 사용자 접근
      toast({
        title: '삭제 실패',
        status: 'error',
        description: '로그인을 하지 않았습니다.',
      });
    }
    const currentUser = user.nickname;
    // 로그인된 사용자와 게시물 작성자를 비교
    if (currentUser === postAuthor) {
      await deletePost(postId);
      // 삭제 성공
      toast({
        title: '삭제 성공',
        status: 'success',
        description: '게시물이 삭제되었습니다.',
      });

      // 3초 딜레이 후 홈으로 이동
      navigate('/');
    }
    // 삭제 실패 : 작성자가 아닌 사용자가 삭제시도
    else {
      toast({
        title: '삭제 실패',
        status: 'error',
        description: '작성자만 삭제할 수 있습니다.',
      });
    }
  };

  // 게시물 수정 버튼 핸들러
  const editButtonHandler = () => {
    if (!checkLoginStatus) {
      // 수정 실패 : 비로그인 사용자 접근
      toast({
        title: '수정 실패',
        status: 'error',
        description: '로그인을 하지 않았습니다.',
      });
    }
    const currentUser = user.nickname;
    // 로그인된 사용자와 게시물 작성자를 비교
    if (currentUser === postAuthor) {
      // 수정 성공
      onOpen();
    }
    // 수정 실패 : 작성자가 아닌 사용자가 수정시도
    else {
      toast({
        title: '수정 실패',
        status: 'error',
        description: '작성자만 수정할 수 있습니다.',
      });
    }
  };

  const editPostHandler = () => {
    updatePost(postId, modifyTitle, modifyContent);
    setPostTitle(modifyTitle);
    setPostContent(modifyContent);

    onClose();
    toast({
      title: '수정 성공',
      status: 'success',
      description: '게시물이 수정되었습니다.',
    });
  };
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
            {/* <Button colorScheme='teal'>수정</Button> */}
            <Button
              ml={5}
              colorScheme="teal"
              // display='none'
              onClick={editButtonHandler}>
              수정
            </Button>
            <Button
              ml={5}
              colorScheme="pink"
              // display='none'
              onClick={() => deleteButtonHandler()}>
              삭제
            </Button>
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
          <Input placeholder="댓글을 작성해보세요." size="lg" onChange={replyChangeHandler} value={newReply} />
          <Button ml={5} h="45px" colorScheme="blue" onClick={saveNewReply}>
            작성하기
          </Button>
        </InputSection>

        {/* Chakra UI Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Your Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Modal Input */}
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input value={modifyTitle} onChange={onChangeModifyTitle} placeholder="Enter New Title" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Content</FormLabel>
                <Input value={modifyContent} onChange={onChangeModifyContent} placeholder="Enter New Content" h={400} />
              </FormControl>
            </ModalBody>

            {/* Modal Button */}
            <ModalFooter>
              <Wrap>
                <WrapItem>
                  <Button colorScheme="blue" mr={3} onClick={editPostHandler}>
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
`;

export default React.memo(Detail);
