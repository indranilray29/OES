// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/Home";
import './styles/App.css';
import Auth from './components/Auth';
import { CheckUserExist } from './helper/Helper';
import Quiz from './components/Quiz';
import Result from './components/Result';
import AiQuiz from './components/AiQuiz';
import AiResult from './components/AiResult';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home />
  },
  {
    path: '/sign-in',
    element: <Auth />
  },
  {
    path: '/sign-up',
    element: <Auth />,
  },
  {
    path : '/quiz',
    element : <CheckUserExist><Quiz /></CheckUserExist>
  },
  {
    path : '/result',
    element : <CheckUserExist><Result /></CheckUserExist>
  },
  {
    path : '/aiQuiz',
    element : <CheckUserExist><AiQuiz /></CheckUserExist>
  },
  {
    path : '/aiResult',
    element : <CheckUserExist><AiResult /></CheckUserExist>
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}