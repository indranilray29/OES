import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setUserId } from '../redux/Result_reducer';
import '../styles/Home.css';
// import { useNavigate } from 'react-router-dom';
import * as Action from '../redux/Question_reducer';
import { UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();

    // Function to set userId and dispatch it to the store
    function startQuiz(activeQuizId) {
        if(isSignedIn){
            dispatch(setUserId(user.username))
        }
        // navigate(`/quiz/${quizId}`);
        dispatch(Action.setActiveQuiz(activeQuizId));

    }

    function startAiQuiz() {
        if(isSignedIn){
            dispatch(setUserId(user.username))
        }
        // <Navigate to={'/aiQuiz'} replace={true} />
        // navigate('/aiQuiz');
    }

    return (
        <div className='container'>
            <UserButton />
            <h1 className='title text-light1'>Online Examination System</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points are awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one option.</li>
                <li>You can review and change answers before the quiz finishes.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            {/* <form id="form">
                <input
                    ref={inputRef}
                    className="userid"
                    type="text"
                    placeholder='Username*'
                    required
                />
            </form> */}

            <div className='start'>
                {/* Start Quiz 1 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(1)} 
                >
                    Start Quiz 1
                </Link>
            </div>

            <div className='start'>
                {/* Start Quiz 2 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(2)} 
                >
                    Start Quiz 2
                </Link>
            </div>

            <div className='start'>
                {/* Start Quiz 2 */}
                <Link 
                    className='btn' 
                    to={'/aiQuiz'} 
                    onClick={() => startAiQuiz()} 
                >
                    Start AI Quiz 
                </Link>
            </div>
        </div>
    );
}
