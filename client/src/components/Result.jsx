import React, { useEffect, useState } from 'react';
import '../styles/Result.css';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from "../helper/Helper";

/** import actions  */
import { resetAllAction } from '../redux/Question_reducer';
import { resetResultAction } from '../redux/Result_reducer';
import { usePublishResult } from '../hooks/SetResult';

import ReviewAnswers from './ReviewAnswers';
// import { usePublishScore } from '../hooks/publishScore';

export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue, answers, activeQuizId }, result: { result, userId } } = useSelector(state => state);
    const { reviewMode } = useSelector((state) => state.result);

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    const [viewResult, setViewResult] = useState(false);
    const [isPublished, setIsPublished] = useState(false);  // New state to track publish status

    // Use usePublishResult hook
    // Publish result only once when component mounts or if data changes
    // usePublishScore([isPublished,setIsPublished],{ 
    //     result, 
    //     username: userId,
    //     attempts,
    //     points: earnPoints,
    //     achieved: flag ? "Passed" : "Failed" 
    // }, activeQuizId);

    // Use usePublishResult hook without arguments
    // const publishResult = usePublishResult();

    // // Publish result only once when component mounts or if data changes
    // useEffect(() => {
    //     // const publishResult = usePublishResult();
    //     if (!isPublished && result && userId) {
    //         publishResult({ 
    //             result, 
    //             username: userId,
    //             attempts,
    //             points: earnPoints,
    //             achieved: flag ? "Passed" : "Failed" 
    //         }, activeQuizId);
    //         setIsPublished(true);  // Set as published to prevent multiple calls
    //     }
    // }, [isPublished, result, userId, attempts, earnPoints, flag, activeQuizId]);

    // if(!isPublished){
        usePublishResult({ 
            result, 
            username : userId,
            attempts,
            points: earnPoints,
            achieved : flag ? "Passed" : "Failed" }, activeQuizId);
    // }

    // setIsPublished(true);

    const viewRes = () => {
        setViewResult(true);
    }

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
        setViewResult(false);
        setIsPublished(false);
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            <div className='result flex-center'>
                <div className='flex'>
                    <span>Username</span>
                    <span className='bold'>{userId || ""}</span>
                </div>
                <div className='flex'>
                    <span>Total Quiz Points : </span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Questions : </span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts : </span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex'>
                    <span>Total Earn Points : </span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex'>
                    <span>Quiz Result</span>
                    <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
                </div>
            </div>

            <div className="start">
                <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
            </div>

            <div>
                {reviewMode && <ReviewAnswers />}
            </div>

            <div 
            // style = {{
            //     display: 'flex',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     paddingTop: '20px'
                
            // }}
            className='start'
            >
                <button 
                className='btn'
                onClick={ viewRes }>View Result Table</button>
            </div>

            <div className="container">
                {/* result table */}
                { viewResult && <ResultTable />}
                {/* <ResultTable /> */}
            </div>
        </div>
    );
}
