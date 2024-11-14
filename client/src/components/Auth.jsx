import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

const Auth = () => {
  return (
    <div className='flex justify-center items-center'>
      <h1 className='bg-red-500 text-5xl'>Welcome to the Quiz Application</h1>
      <SignIn routing="path" path="/sign-in" />
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default Auth;