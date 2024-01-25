import React from 'react';
import Router from './routes/Router';
import { useQuery } from 'react-query';
import { getUser } from './server/userService';

const fetchUserData = async () => {
  const userId = localStorage.getItem('userId');
  const user = await getUser(userId);
  return user;
};

const App = () => {
  // 유저 데이터
  const { isLoading } = useQuery('user', fetchUserData);

  return <>{!isLoading && <Router />}</>;
};

export default React.memo(App);
