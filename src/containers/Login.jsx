import React from 'react';
import LoginSignUpForm from '../components/LoginSignUpForm';

const Login = () => {
  return (
    <div>
      <LoginSignUpForm type="login" />
    </div>
  );
};

export default React.memo(Login);
