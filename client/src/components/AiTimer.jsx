// components/Timer.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTimer, autoSubmitQuiz } from '../redux/Question_reducer';
import { Navigate } from 'react-router-dom';
import { setReviewDataAction } from "../redux/Result_reducer";
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/Helper';

const AiTimer = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.questions.timer);
  const isSubmitted = useSelector((state) => state.questions.isSubmitted);
  const { queue, answers } = useSelector((state) => state.questions);
  const { result, userId } = useSelector((state) => state.result);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  const [resultData, setResultData] = useState({});

  useEffect(() => {
    const countdown = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    // Auto-submit when timer reaches 0
    if (timer === 0) {
      clearInterval(countdown);
      dispatch(autoSubmitQuiz());
    }

    return () => clearInterval(countdown);
  }, [dispatch, timer]);

  // Handle redirection to results page after submission
  useEffect(() => {
    if (isSubmitted) {
      const resultData = {
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achieved: flag ? "Passed" : "Failed",
      };
      setResultData(resultData);
      dispatch(setReviewDataAction({ result, correctAnswers: answers }));
    }
  }, [isSubmitted, dispatch, result, userId, attempts, earnPoints, flag, answers]);

  // Redirect to result page if quiz is submitted
  if (isSubmitted) {
    return <Navigate to={'/aiResult'} replace={true} />;
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div style={{ display: "flex", justifyItems: "center"}}>
      <p style={{ color: "white", fontSize: "1.5rem", border: "3px solid white", borderRadius: "20%" , padding: "5px"}}>
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default AiTimer;
