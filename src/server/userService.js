const { v4: uuidv4 } = require('uuid');
const jwt = require('jwt-encode');
const jwtDecode = require('jwt-decode');

// --- 가짜 DB 데이터 ---
const userList = [
  {
    id: '1',
    email: 'mini0006@naver.com',
    nickname: '곽민지',
    password: 'af5b0d44597f831e45e958249f0320df71dae8cedb12bdaab61d1cf4111a8874',
    profileImg: '',
  },
];

const SECRET_KEY = 'your-secret-key';
const refreshTokens = {};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// accessToken 발급 함수
const generateAccessToken = (user) => {
  const token = jwt(
    { id: user.id, email: user.email, nickname: user.nickname, profileImg: user.profileImg },
    SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );
  return token;
};

// refreshToken 발급 함수
const generateRefreshToken = (id) => {
  const refreshToken = jwt({ id }, SECRET_KEY, {
    expiresIn: '1h',
  });
  return refreshToken;
};

// refresh token 유효성 검사
const verifyRefreshToken = async (token, id) => {
  // 받은 refreshToken이 저장돼 있는 값과 일치하는지 확인
  try {
    if (refreshTokens[id] === token) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      ok: true,
      id: decoded.id,
    };
  } catch (e) {
    return {
      ok: false,
      message: e.message,
    };
  }
};

// --- controller ---
// 로그인: 이메일과 비밀번호로 사용자 인증을 수행하고 JWT 토큰을 반환
const authenticateUser = async (email, password) => {
  const user = userList.find((u) => u.email === email);

  // 이메일 불일치
  if (!user) {
    const error = new Error('존재하지 않는 계정입니다.');
    error.name = 'UserNotFoundError';
    throw error;
  }

  // 비밀번호 불일치
  if (user.password !== password) {
    const error = new Error('비밀번호가 틀렸습니다.');
    error.name = 'IncorrectPasswordError';
    throw error;
  }

  // 사용자 정보를 기반으로 JWT 토큰을 생성
  const id = user.id;
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(id);

  // refreshToken 데이터 저장
  refreshTokens[id] = refreshToken;

  return { id, accessToken, refreshToken };
};

// const refreshUser = (refreshToken) => {
//   if (!refreshToken || !refreshToken[refreshToken]) {
//     return 'Invalid refresh token';
//   }

//   jwt(refreshTokens[refreshToken], SECRET_KEY, (err, user) => {
//     if (err) {
//       return 'Invalid refresh token';
//     }

//     const accessToken = generateAccessToken(user);
//     return accessToken;
//   });
// };

// 회원가입
const createUser = async (email, nickname, password) => {
  // 이메일 중복 확인
  const emailExists = userList.some((user) => user.email === email);
  if (emailExists) {
    const error = new Error('이미 존재하는 계정입니다.');
    error.name = 'EmailExistsError';
    throw error;
  }

  // 새로운 유저 생성
  await sleep(1000);
  const uniqueId = uuidv4();
  const id = uniqueId;
  const profileImg = '';
  const newUser = { id, email, nickname, password, profileImg };
  userList.push(newUser);

  return '회원가입 성공';
};

// 유저 정보(이메일 / 닉네임) 변경
const modifyUserInfo = async (id, email, nickname) => {
  await sleep(1000);
  const user = userList.find((user) => user.id === id);
  user.email = email;
  user.nickname = nickname;
  return user;
};

// 비밀번호 변경
const modifyUserPassword = async (id, password) => {
  await sleep(1000);
  const user = userList.find((user) => user.id === id);
  user.password = password;
  return;
};

// 프로필 이미지 변경
const modifyUserImg = async (id, profileImg) => {
  await sleep(1000);
  const user = userList.find((user) => user.id === id);
  user.profileImg = profileImg;
  return user;
};

// 유저 삭제
const deleteUser = async (id) => {
  await sleep(1000);
  const index = userList.findIndex((user) => user.id === id);
  userList.splice(index, 1);
  return userList;
};

export {
  verifyRefreshToken,
  verifyAccessToken,
  authenticateUser,
  createUser,
  modifyUserInfo,
  modifyUserPassword,
  modifyUserImg,
  deleteUser,
};

// // 로그인 테스트
// const loginTest = async () => {
//   try {
//     const token = await authenticateUser(
//       'mini0006@naver.com',
//       'af5b0d44597f831e45e958249f0320df71dae8cedb12bdaab61d1cf4111a8874'
//     );
//     console.log('JWT Token:', token);
//   } catch (error) {
//     console.error('Login failed:', error.message);
//   }
// };

// // 회원가입 테스트
// const signupTest = async () => {
//   const createdUser = await createUser('newuser@example.com', 'New User', 'new-password');
//   console.log('Created User:', createdUser);
// };

// // 로그인 및 회원가입 테스트 수행
// loginTest();
// signupTest();
