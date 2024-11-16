import React, { useEffect, useState } from 'react';
import '../styles/Result.css';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from "../helper/Helper";

/** import actions  */
import { resetAllAction } from '../redux/Question_reducer';
import { resetResultAction } from '../redux/Result_reducer';
import { deleteAiResults, usePublishResult } from '../hooks/SetResult';

import ReviewAnswers from './ReviewAnswers';
// import { usePublishScore } from '../hooks/publishScore';

// import { deleteServerData } from '../helper/Helper';
import { deleteAiQuestions } from '../hooks/SetResult';

export default function AiResult() {
    const dispatch = useDispatch();
    const { questions: { queue, answers, activeQuizId }, result: { result, userId } } = useSelector(state => state);
    const { reviewMode } = useSelector((state) => state.result);
    const navigate = useNavigate();

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    // const [viewResult, setViewResult] = useState(false);
    const [isPublished, setIsPublished] = useState(false);  // New state to track publish status

    // Assuming usePublishResult returns a function to publish the result
    const publishResult = usePublishResult();

useEffect(() => {
    const publishData = async () => {
        if (result.length > 0 && userId) {
            await publishResult({ 
                result, 
                username: userId,
                attempts,
                points: earnPoints,
                achieved: flag ? "Passed" : "Failed" 
            }, activeQuizId);
            setIsPublished(true); // Mark as published
        }
    };

    if (!isPublished) {
        publishData();
    }
}, [isPublished, result, userId, attempts, earnPoints, flag, activeQuizId, publishResult]);

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
        // usePublishResult({ 
        //     result, 
        //     username : userId,
        //     attempts,
        //     points: earnPoints,
        //     achieved : flag ? "Passed" : "Failed" }, activeQuizId);
    // }

    // setIsPublished(true);

    // const viewRes = () => {
    //     setViewResult(true);
    // }

    async function onRestart() {
        try {
            // Reset state
            dispatch(resetAllAction());
            dispatch(resetResultAction());

            // Delete AI questions and results
            await deleteAiQuestions();
            await deleteAiResults(activeQuizId);

            // Navigate to the home page
            navigate('/');
        } catch (error) {
            console.error("Error during restart and delete:", error);
            alert("Failed to restart and delete AI questions.");
        }
    }

    // const handleDelete = async () => {
    //     try {
    //         await deleteAiQuestions(); // Wait for the deletion to complete
    //         await deleteAiResults(activeQuizId);
    //         // Optionally update the UI or state here
    //         alert("AI questions deleted successfully!");
    //     } catch (error) {
    //         console.error("Error deleting AI questions:", error);
    //         alert("Failed to delete AI questions.");
    //     }
    // };

    return (
        <div className='container'>
            <h1 className='title text-light1'>Online Examination System</h1>

            <div className='result flex-center1'>
                <div className='flex1'>
                    <span>Username</span>
                    <span className='bold'>{userId || ""}</span>
                </div>
                <div className='flex1'>
                    <span>Total Quiz Points : </span>
                    <span className='bold'>{totalPoints || 0}</span>
                </div>
                <div className='flex1'>
                    <span>Total Questions : </span>
                    <span className='bold'>{queue.length || 0}</span>
                </div>
                <div className='flex1'>
                    <span>Total Attempts : </span>
                    <span className='bold'>{attempts || 0}</span>
                </div>
                <div className='flex1'>
                    <span>Total Earn Points : </span>
                    <span className='bold'>{earnPoints || 0}</span>
                </div>
                <div className='flex1'>
                    <span>Quiz Result</span>
                    <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
                </div>
            </div>
            {/* <button onClick={handleDelete}>Delete AI Questions</button> */}
            <div className="start">
                <button className='btn' onClick={onRestart}>Restart</button>
            </div>

            <div style={{ marginTop: "20px"}}>
                {reviewMode && <ReviewAnswers />}
            </div>

            {/* <div 
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
            </div> */}

            {/* <div className="container"> */}
                {/* result table */}
                {/* { viewResult && <ResultTable />} */}
                {/* <ResultTable /> */}
            {/* </div> */}
        </div>
    );
}
