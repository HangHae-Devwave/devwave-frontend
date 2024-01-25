import React from 'react';
import styled from 'styled-components';
import ProfileImg from './ProfileImg';

const PostItem = ({ post, onClick }) => {
  return (
    <Post onClick={onClick}>
      <InfoContainer>
        <ProfileBox>
          <ProfileImg />
          <div>
            <Author>{post.author}</Author>
            <BoardType>{post.type}</BoardType>
          </div>
        </ProfileBox>
        <Date>{post.date}</Date>
      </InfoContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content.length < 50 ? post.content : post.content.slice(0, 47) + ' ...'}</PostContent>
    </Post>
  );
};

const Post = styled.div`
  background-color: #f7fbff;
  padding: 30px;
  border-radius: 12px;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Author = styled.p`
  padding-left: 3px;
  color: #32366a;
  font-size: 16px;
`;

const BoardType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dfeeff;
  color: #037efa;
  font-size: 10px;
  border-radius: 10px;
  height: 20px;
  width: 52px;
  margin-top: 5px;
`;

const Date = styled.p`
  font-family: ${(props) => props.theme.fonts.title};
  color: #8d91ab;
  font-size: 12px;
`;

const PostTitle = styled.p`
  margin-top: 26px;
  padding-bottom: 12px;
  font-size: 20px;
  color: #505379;
  border-bottom: 1px solid #d7ebff;
`;

const PostContent = styled.p`
  padding-top: 30px;
  font-size: 17px;
  color: #505379;
`;

export default PostItem;
