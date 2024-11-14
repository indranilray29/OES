import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import "../styles/Auth.css"

const Auth = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-10'>
      <h1 className='text-white text-5xl border-4 border-green-600 p-4'>Welcome to the Quiz Application</h1>
      <SignIn routing="path" path="/sign-in" />
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default Auth;