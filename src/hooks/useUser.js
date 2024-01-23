import Cookies from 'js-cookie';
import { useQueryClient } from 'react-query';

const useUser = () => {
  const queryClient = useQueryClient();

  const updateUser = (newUser) => {
    // 사용자 로그인이나, 사용자 정보 업데이트를 처리
    queryClient.setQueryData('user', newUser); // onSuccess를 트리거한다.
  };

  const clearUser = () => {
    // 로그아웃 처리
    queryClient.setQueryData('user', null); // onSuccess를 트리거한다.
    Cookies.remove('refreshToken');
  };
  return [updateUser, clearUser];
};
export default useUser;
