import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../styles/GlobalStyles';
import PostManager from '../server/postService';
import spinner from '../assets/loading-spinner.gif';

const Home = () => {
  // --- 희원 ---
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('Admin');

  // --- 민지 ---
  const postManager = new PostManager();
  const [inputVal, setInputVal] = useState({ title: '', content: '' });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 서버에서 데이터를 가져와서 로컬 상태에 설정하는 비동기 함수
    const fetchPosts = async () => {
      // 서버에서 데이터를 가져오는 비동기 요청
      await postManager
        .getPostList()
        .then((response) => {
          localStorage.setItem('posts', response);
          setPosts(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // 컴포넌트가 마운트될 때 한 번 데이터를 가져오도록 호출
    fetchPosts();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행되도록 보장

  const toggleModalHandler = () => setModalIsOpen((state) => !state);

  // --- 희원 ---
  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  const handlePostClick = (post) => {
    navigate(`/${post.id}`, { state: { post } });
  };

  // --- 민지 ---
  const addPost = () => {
    if (!!inputVal.title && !!inputVal.content) {
      postManager.createPost(inputVal.title, inputVal.content);
      // 모달 닫기
      toggleModalHandler();
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  const titleChangeHandler = (e) => setInputVal({ ...inputVal, title: e.target.value });
  const contentChangeHandler = (e) => setInputVal({ ...inputVal, content: e.target.value });
  // ----------

  return (
    <MainLayout>
      <Container>
        <Header>
          <Logo>새로운 게시글을 작성해보세요!</Logo>
          <NewPostButton onClick={toggleModalHandler}>New Post</NewPostButton>
        </Header>

        <Content>
          {/* 게시물 목록 */}
          {isLoading && <img src={spinner} alt="" />}
          {!isLoading && (
            <Posts>
              {posts.map((post) => (
                <Post key={post.id} onClick={() => handlePostClick(post)}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{post.content}</PostContent>
                  <Author>작성자 : {post.author}</Author>
                </Post>
              ))}
            </Posts>
          )}
        </Content>
        {/* 모달 */}
        <Modal isOpen={modalIsOpen} onRequestClose={toggleModalHandler} style={ModalStyle}>
          <ModalContainer>
            <InputLabel>Title:</InputLabel>
            <Input type="text" value={inputVal.title} onChange={titleChangeHandler} />
            <InputLabel>Content:</InputLabel>
            <Textarea value={inputVal.content} onChange={contentChangeHandler} />
            <ButtonGroup>
              <Button onClick={addPost}>게시하기</Button>
              <Button onClick={toggleModalHandler}>닫기</Button>
            </ButtonGroup>
          </ModalContainer>
        </Modal>
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

  & > img {
    margin: 0 auto;
  }
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
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default React.memo(Home);
