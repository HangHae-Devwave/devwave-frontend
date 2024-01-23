const { v4: uuidv4 } = require('uuid');
const jwt = require('jwt-encode');

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

// refreshToken 유효성 검사
const verifyRefreshToken = (token, id) => {
  // 받은 refreshToken이 저장돼 있는 값과 일치하는지 확인
  try {
    if (refreshTokens[id] === token) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

// accessToken 유효성 검사
// const verifyAccessToken = (token) => {
//   try {
//     const decoded = token;
//     return {
//       ok: true,
//       id: decoded,
//     };
//   } catch (e) {
//     return {
//       ok: false,
//       message: 'jwt expired',
//     };
//   }
// };

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
  const userId = user.id;
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(userId);

  // refreshToken 데이터 저장
  refreshTokens[userId] = refreshToken;

  return { userId, accessToken, refreshToken };
};

const refresh = async (userId, accessToken, refreshToken) => {
  // access, refresh 토큰이 헤더에 담겨 온 경우
  if (accessToken && refreshToken) {
    // access token 검증 -> expired여야 함.
    // const authResult = verifyAccessToken(accessToken);

    // access token 디코딩하여 userId를 가져온다.
    // const decoded = authResult.id;

    // 디코딩 결과가 없으면 권한이 없음을 응답.
    // if (!decoded) {
    //   throw new Error(failResponse(401, '권한이 없습니다!'));
    // }

    // access 토큰 만료 시
    // if (authResult.ok === false && authResult.message === 'jwt expired') {
    // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
    const refreshResult = await verifyRefreshToken(refreshToken, userId);
    if (refreshResult === false) {
      throw new Error('No authorized! 다시 로그인해주세요.');
    } else {
      // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
      const newAccessToken = generateAccessToken({ id: userId });

      return {
        accessToken: newAccessToken,
        refreshToken,
      };
    }
    // } else {
    //   // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
    //   const error = new Error('Access token is not expired!');
    //   error.type = 400;
    //   throw error;
    // }
  } else {
    // access token 또는 refresh token이 헤더에 없는 경우
    throw new Error('Access token and refresh token are need for refresh!');
  }
};

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

export { authenticateUser, refresh, createUser, modifyUserInfo, modifyUserPassword, modifyUserImg, deleteUser };

// 로그인 테스트
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

// const refreshTest = async () => {
//   try {
//     const value = {
//       userId: '1',
//       accessToken:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFoIn0.eyJpZCI6IjEiLCJlbWFpbCI6Im1pbmkwMDA2QG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoi6rO966-87KeAIiwicHJvZmlsZUltZyI6IiJ9.9xQHgVFSuLf8FB7BtRChsfHqGCrmKOQtW3cXyAj20z0',
//       refreshToken:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImV4cGlyZXNJbiI6IjFoIn0.eyJpZCI6IjEifQ.FmtXsJ8P08XxZhf8W2qClUiQ4nyBprGPpukWKdKi_HI',
//     };
//     console.log('refreshTokens: ', refreshTokens);
//     const res = await refresh('1', value.accessToken, value.refreshToken);
//     console.log(res);
//   } catch (e) {
//     console.error('refreshTest: ', e);
//   }
// };
// refreshTest();
