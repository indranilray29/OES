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
            <div style={{ display: "flex", justifyItems: "center", gap: "10%", flexWrap: "wrap" }}>
            <div className='start'>
                {/* Start Quiz 1 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(1)} 
                >
                    Javascript Quiz
                </Link>
            </div>

            <div className='start'>
                {/* Start Quiz 2 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(2)} 
                >
                    Geography Quiz
                </Link>
            </div>


            <div className='start'>
                {/* Start Quiz 4 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(4)} 
                >
                    React Quiz
                </Link>
            </div>

            <div className='start'>
                {/* Start Quiz 3 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(3)} 
                >
                    Mathematics Quiz
                </Link>
            </div>

            <div className='start'>
                {/* Start Quiz 5 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(5)} 
                >
                    Science Quiz
                </Link>
            </div>

            <div className='start'>
                {/* Start Quiz 6 */}
                <Link 
                    className='btn' 
                    to={'/quiz'} 
                    onClick={() => startQuiz(6)} 
                >
                    English Quiz
                </Link>
            </div>

            </div>

            <div className='start' style={{ marginTop: "20px"}}>
                {/* Start Quiz 2 */}
                <Link 
                    className='aibtn' 
                    to={'/aiQuiz'} 
                    onClick={() => startAiQuiz()} 
                >
                    Start AI Generated Quiz
                </Link>
            </div>
            
        </div>
    );
}
