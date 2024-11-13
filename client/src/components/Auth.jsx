import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const Auth = () => {
  return (
    <div>
      <h1>Welcome to the Quiz Application</h1>
      <SignIn routing="path" path="/sign-in" />
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default Auth;