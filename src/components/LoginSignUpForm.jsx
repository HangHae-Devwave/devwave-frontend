import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import { useAlert } from '../contexts/AlertProvider';
import { authenticateUser, createUser, refresh } from '../server/userService';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import Button from './button/Button';
import Input from './input/Input';
import wallpaperImg from '../assets/wave-login.JPG';
import emailIcon from '../assets/email-icon.svg';
import profileIcon from '../assets/profile-icon.svg';
import lockIcon from '../assets/lock-icon.svg';
import checkIcon from '../assets/check-icon.svg';

const LoginSignUpForm = ({ type }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [inputVal, setInputVal] = useState({ email: '', nickname: '', password: '', passwordConfirm: '' });
  const [isValid, setIsValid] = useState({
    isEmailValid: true,
    isNicknameValid: true,
    isPasswordValid: true,
    isPasswordConfirmValid: true,
  });

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    return regex.test(email);
  };

  const validateNickname = (nickname) => {
    // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성, 한글 초성 및 모음은 허가하지 않는다.
    const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    return regex.test(nickname);
  };

  const validatePassword = (password) => {
    //  8 ~ 10자 영문, 숫자 조합
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    return regex.test(password);
  };

  const emailChangeHandler = (e) => {
    const email = e.target.value;
    setInputVal({ ...inputVal, email });
    setIsValid({ ...isValid, isEmailValid: validateEmail(email) });
  };

  const nicknameChangeHandler = (e) => {
    const nickname = e.target.value;
    setInputVal({ ...inputVal, nickname });
    setIsValid({ ...isValid, isNicknameValid: validateNickname(nickname) });
  };

  const passwordChangeHandler = (e) => {
    const password = e.target.value;
    setInputVal({ ...inputVal, password });
    setIsValid({ ...isValid, isPasswordValid: validatePassword(password) });
  };

  const passwordConfirmChangeHandler = (e) => {
    setInputVal({ ...inputVal, passwordConfirm: e.target.value });
    setIsValid({ ...isValid, isPasswordConfirmValid: inputVal.password === e.target.value ? true : false });
  };

  const getTokenFromLocal = async () => {
    try {
      const accessToken = await localStorage.getItem('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      if (accessToken && refreshToken) {
        return { accessToken, refreshToken };
      } else {
        return null;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const verifyTokens = async () => {
    const token = await getTokenFromLocal();

    try {
      const res = await refresh(token.accessToken, token.refreshToken);

      // accessToken 만료, refreshToken 정상 -> 재발급된 accessToken 저장 후 자동 로그인
      localStorage.setItem('accessToken', res.accessToken);
      Cookies.set('refreshToken', res.refreshToken);
    } catch (e) {
      // const code = e.code;
      console.log('error: ', e);
    }
  };

  const loginHandler = async () => {
    if (inputVal.email === '') {
      setIsValid({ ...isValid, isEmailValid: false });
      return;
    } else if (inputVal.password === '') {
      setIsValid({ ...isValid, isPasswordValid: false });
      return;
    }

    if (isValid.isEmailValid && isValid.isPasswordValid) {
      await authenticateUser(inputVal.email, SHA256(inputVal.password).toString())
        .then(({ userId, accessToken, refreshToken }) => {
          localStorage.setItem(
            'tokens',
            JSON.stringify({
              accessToken: accessToken,
              refreshToken: refreshToken,
            })
          );
          localStorage.setItem('userId', userId);
          showAlert('로그인 성공', 'success');
          navigate('/');
        })
        .catch((error) => {
          showAlert(error.message, 'error');
          if (error.name === 'UserNotFoundError') {
            setIsValid({ ...isValid, isEmailValid: false });
          } else if (error.name === 'IncorrectPasswordError') {
            setIsValid({ ...isValid, isPasswordValid: false });
          }
        });
    }
  };

  const signupHandler = async () => {
    if (inputVal.email === '') {
      setIsValid({ ...isValid, isEmailValid: false });
      return;
    } else if (inputVal.nickname === '') {
      setIsValid({ ...isValid, isNicknameValid: false });
      return;
    } else if (inputVal.password === '') {
      setIsValid({ ...isValid, isPasswordValid: false });
      return;
    } else if (inputVal.passwordConfirm === '') {
      setIsValid({ ...isValid, isPasswordConfirmValid: false });
      return;
    }

    if (isValid.isEmailValid && isValid.isNicknameValid && isValid.isPasswordValid && isValid.isPasswordConfirmValid) {
      await createUser(inputVal.email, inputVal.nickname, SHA256(inputVal.password).toString())
        .then((response) => {
          showAlert(response, 'success');
          navigate('/login');
        })
        .catch((error) => {
          showAlert(error.message, 'error');
          if (error.name === 'EmailExistsError') {
            setIsValid({ ...isValid, isEmailValid: false });
          }
        });
    }
  };

  return (
    <Layout>
      <WallPaper src={wallpaperImg} alt="wave" />
      <FormContainer>
        <Title>{type === 'login' ? 'Login' : 'Sign Up'}</Title>
        <InputContainer>
          <Input
            icon={emailIcon}
            type="text"
            placeholder="E-mail"
            value={inputVal.email}
            onChange={emailChangeHandler}
            isValid={isValid.isEmailValid}
          />
          {type === 'signup' && (
            <Input
              icon={profileIcon}
              type="text"
              placeholder="Nickname"
              value={inputVal.nickname}
              onChange={nicknameChangeHandler}
              isValid={isValid.isNicknameValid}
            />
          )}
          <Input
            icon={lockIcon}
            type="password"
            placeholder="Password"
            value={inputVal.password}
            onChange={passwordChangeHandler}
            isValid={isValid.isPasswordValid}
          />
          {type === 'signup' && (
            <Input
              icon={checkIcon}
              type="password"
              placeholder="Password Confirm"
              value={inputVal.passwordConfirm}
              onChange={passwordConfirmChangeHandler}
              isValid={isValid.isPasswordConfirmValid}
            />
          )}
        </InputContainer>
        <FooterBox>
          <Button size="full" color="primary" onClick={type === 'login' ? loginHandler : signupHandler}>
            {type === 'login' ? '로그인' : '회원가입'}
          </Button>
          <ChangeBox>
            <div>{type === 'login' ? '계정이 없으신가요?' : '이미 가입하셨나요?'}</div>
            <Link to={type === 'login' ? '/signup' : '/login'}>
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
  min-height: 620px;
`;

const FormContainer = styled.div`
  width: 55vw;
  padding: 18vh 13vw;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: bolder;
  color: ${(props) => props.theme.colors.text.common};
  font-family: ${(props) => props.theme.fonts.title};
`;

const InputContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 3vh;
`;

const FooterBox = styled.div`
  position: absolute;
  width: 29vw;
  top: 70vh;
  @media all and (max-height: 700px) {
    top: 480px;
  }
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
    color: ${(props) => props.theme.colors.text.common};
  }
  & > a {
    font-weight: bolder;
    text-decoration: none;
    color: ${(props) => props.theme.colors.button.primary};

    &:hover {
      color: rgba(0, 125, 250, 0.8);
    }
  }
`;

export default LoginSignUpForm;
