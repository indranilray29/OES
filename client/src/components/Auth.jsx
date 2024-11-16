import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import "../styles/Auth.css"

const Auth = () => {
  return (
    <div 
    style={{
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "center",
      "alignItems": "center",
      "gap": "2rem",
      "marginTop": "2.5rem",
    }}>
      <h1 className='text-white text-5xl border-4 border-green-600 p-4'
      style={{
        "color": "white",
        "fontSize": "3rem",
        "lineHeight": "1",
        "border": "4px solid #16a34a",
        // "borderWidth": "4px",
        "borderColor": "#16a34a",
        "padding": "10px"
      }}
      >Welcome to the Quiz Application</h1>
      <SignIn routing="path" path="/sign-in" />
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default Auth;