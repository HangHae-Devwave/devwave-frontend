import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1, title: "리액트 관련 질문있습니다!",
      content: "리액트 질문내용", author: "hee1",
    },
    {
      id: 2, title: "스프링 관련 질문있습니다!",
      content: "스프링 질문내용", author: "hee1",
    },
    {
      id: 3, title: "nodejs 관련 질문있습니다!",
      content: "nodejs 질문내용", author: "hee1",
    },
    {
      id: 4, title: "css 관련 질문있습니다!",
      content: "css 질문내용", author: "hee1",
    }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addPost = () => {
    if (title && content) {
      const newPost = { 
        id: Date.now(), 
        title, 
        content,
        author
      };
      setPosts([...posts, newPost]);
      closeModal();
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  const navigate = useNavigate();

  const handlePostClick = (post) => {
    navigate(`/${post.id}`, { state: { post } });
  };

  return (
    <Container>
      <Header>
        <Logo>새로운 게시글을 작성해보세요!</Logo>
        <NewPostButton onClick={openModal}>New Post</NewPostButton>
      </Header>

      <Content>
        {/* 게시물 목록 */}
        <Posts>
          {posts.map((post) => (
            <Post
              key={post.id}
              onClick={()=>handlePostClick(post)}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <Author>작성자 : {post.author}</Author>
            </Post>
          ))}
        </Posts>

        {/* 모달 */}
        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={ModalStyle}
        >
          <ModalContainer>
            <InputLabel>Title:</InputLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputLabel>Content:</InputLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <ButtonGroup>
              <Button onClick={addPost}>게시하기</Button>
              <Button onClick={closeModal}>닫기</Button>
            </ButtonGroup>
          </ModalContainer>
        </Modal>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
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
  &:hover{
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
`;
const PostTitle = styled.h3`
  font-size: 25px;
  `
const PostContent = styled.p`
  font-size: 17px;

`
const Author = styled.p`
  position: absolute;
  bottom: 0;
  right: 20px;
  margin-top: 8px;
  font-style: italic;
  color: #555;
  font-size: 17px;
`;
const ModalStyle = {
  content: {
    maxWidth: '700px',
    height: '500px',
    margin: 'auto',
    borderRadius: '8px',
    padding: '20px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
const ModalContainer = styled.div`
  position: abo;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputLabel = styled.label`
  font-weight: bold;
`;
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 250px;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 700px;
  margin-top: 30px;
`
const Button = styled.button`
  background-color: #333;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default React.memo(Home);