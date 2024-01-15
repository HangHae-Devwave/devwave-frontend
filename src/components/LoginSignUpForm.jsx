import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import wallpaperImg from '../assets/wave-login.JPG';
import emailIcon from '../assets/email.svg';
import profileIcon from '../assets/profile.svg';
import lockIcon from '../assets/lock.svg';
import Button from './Button';
import Input from './Input';

const LoginSignUpForm = ({ type }) => {
  return (
    <Layout>
      <WallPaper src={wallpaperImg} alt="wave" />
      <FormContainer>
        <Title>{type === 'login' ? 'Login' : 'Sign Up'}</Title>
        <InputContainer>
          <Input icon={emailIcon} type="text" placeholder="E-mail" />
          {type === 'login' && <Input icon={profileIcon} type="text" placeholder="Nickname" />}
          <Input icon={lockIcon} type="password" placeholder="Password" />
        </InputContainer>
        <FooterBox>
          <Button size="full" primary>
            {type === 'login' ? '로그인' : '회원가입'}
          </Button>
          <ChangeBox>
            <div>{type === 'login' ? '계정이 없으신가요?' : '이미 가입하셨나요?'}</div>
            <Link to={type === 'login' ? '/signup' : '/login'} primary>
              {type === 'login' ? '회원가입 하러가기' : '로그인 하러가기'}
            </Link>
          </ChangeBox>
        </FooterBox>
      </FormContainer>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
`;

const WallPaper = styled.img`
  width: 45vw;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 55vw;
  padding: 22vh 13vw;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bolder;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.title};
`;

const InputContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const FooterBox = styled.div`
  position: absolute;
  top: 520px;
  width: 417px;
`;

const ChangeBox = styled.div`
  width: 100%;
  margin-top: 25px;
  padding: 15px 5px;
  border-top: 1px solid #ececf0;
  display: flex;
  justify-content: space-between;

  & > div {
    font-weight: bolder;
    color: ${(props) => props.theme.colors.text};
  }
  & > a {
    font-weight: bolder;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      color: rgba(0, 125, 250, 0.8);
    }
  }
`;

export default LoginSignUpForm;
