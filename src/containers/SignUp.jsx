import React from 'react';
import LoginSignUpForm from '../components/LoginSignUpForm';

const SignUp = () => {
  return (
    <div>
      {' '}
      <LoginSignUpForm type="signup" />
    </div>
  );
};

export default React.memo(SignUp);
