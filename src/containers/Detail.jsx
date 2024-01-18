import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../styles/GlobalStyles';

const Detail = () => {
  // Home.jsx에서 데이터 가져옴
  // const location = useLocation().state;
  const location = useLocation().state;
  const postTitle = location.post.title;
  const postAuthor = location.post.author;
  const postContent = location.post.content;

  useEffect(() => {
    console.log(location);
    console.log(postTitle);
    console.log(postAuthor);
    console.log(postContent);
  }, []);

  // 이전 페이지로 돌아가기 기능을 위한 navigate
  const navigate = useNavigate();
  const previousPageHandler = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <Container>
        <PreviousPageGroup onClick={previousPageHandler}>
          <span className="material-symbols-outlined">undo</span>
          이전 페이지로 돌아가기
        </PreviousPageGroup>
        {/* 게시물 영역 */}
        <ContentWrapper>
          <Title>{postTitle}</Title>
          <Author>작성자: {postAuthor}</Author>
          <Content>{postContent}</Content>
        </ContentWrapper>

        {/* 댓글 영역 */}
        <CommentSection>
          <CommentTitle>댓글</CommentTitle>
          {/* {post.comments.map((comment) => (
          <Comment key={comment.id}>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentText>{comment.text}</CommentText>
          </Comment>
        ))} */}
        </CommentSection>
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
const CommentSection = styled.div`
  margin-top: 20px;
`;
const CommentTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;
// const Comment = styled.div`
//   background-color: #f0f0f0;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 15px;
// `;
// const CommentAuthor = styled.p`
//   font-weight: bold;
//   font-size: 20px;
// `;
// const CommentText = styled.p`
//   font-size: 17px;
// `;

export default React.memo(Detail);
