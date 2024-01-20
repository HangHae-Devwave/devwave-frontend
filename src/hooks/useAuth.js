import { useMutation, useQueryClient } from 'react-query';
import { authenticateUser, createUser, refreshUser } from '../server/userService';

const login = async (email, password) => await authenticateUser(email, password);
const refreshAccessToken = async (refreshToken) => await refreshUser(refreshToken);

const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: authData, mutate } = useMutation(login);
  const { data: refreshedAuthData, mutate: refresh } = useMutation(refreshAccessToken, {
    onSuccess: (data) => {
      // 갱신된 토큰을 저장하거나 다른 처리를 수행
      console.log('Refreshed access token:', data.accessToken);
      queryClient.setQueryData('auth', { ...authData, accessToken: data.accessToken });
    },
  });

  const loginHandler = async (email, password) => {
    await mutate(email, password);
  };

  const signupHandler = async (email, nickname, password) => {
    await createUser(email, nickname, password);
  };

  const handleRefreshAccessToken = async () => {
    const refreshToken = authData?.refreshToken;

    if (refreshToken) {
      await refresh(refreshToken);
    } else {
      console.log('No refresh token available');
    }
  };

  return { authData, loginHandler, signupHandler, handleRefreshAccessToken };
};

export default useAuth;
