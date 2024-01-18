import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { MainLayout } from '../styles/GlobalStyles';

const Detail = () => {

  // Home.jsx에서 데이터 가져옴
  const location = useLocation().state;
  const postTitle = location.post.title;
  const postAuthor = location.post.author;
  const postContent = location.post.content;
  const postComments = location.post.comment || [];

  // useEffect(()=>{
  //   console.log(location);
  //   console.log(postTitle);
  //   console.log(postAuthor);
  //   console.log(postContent);
  //   console.log(postComments);
  // }, [])


  // 이전 페이지로 돌아가기 기능을 위한 navigate
  const navigate = useNavigate();
  const previousPageHandler = () => {
    navigate('/');
  }

  return (
    <MainLayout>
      <Container>
        {/* 이전으로 돌아가기 버튼 */}
        <PreviousPageGroup
          onClick={previousPageHandler}>
          <span 
            className="material-symbols-outlined">
            undo
          </span>
          이전 페이지로 돌아가기
        </PreviousPageGroup>

        {/* 게시물 영역 */}
        <ContentWrapper>
          <Title>{postTitle}</Title>
          <Author>작성자: {postAuthor}</Author>
          <Content>{postContent}</Content>
          <ButtonGroup>
            <EditButton>
              수정
            </EditButton>
            <DeleteButton>
              삭제
            </DeleteButton>
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

        {/* <InputSection>
            <ReplyInput />
            <ReplyButton>작성</ReplyButton>
        </InputSection> */}

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
`
const ContentWrapper = styled.div`
  position: relative;
  background-color: #e8e8e8;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px; 
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
const ButtonGroup = styled.div`
  position: absolute;
  width: 210px;
  right: 15px;
  bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const EditButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid #24deffe4;
  background-color: white;
  font-weight: 700;
  `
  const DeleteButton  = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid #24deffe4;
  background-color: white;
  font-weight: 700;
`
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
// const InputSection = styled.div`
//   position: fixed;
//   width: 800px;
//   height: 100px;
//   bottom: 10px;
//   border-radius: 10px;
//   background-color: green;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `
// const ReplyInput = styled.input`

// `
// const ReplyButton = styled.button`

// `

  export default React.memo(Detail);