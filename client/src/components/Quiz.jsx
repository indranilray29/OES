import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/SetResult';
import { setReviewDataAction } from '../redux/Result_reducer';
import Timer from './Timer';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {

    const { answers } = useSelector(state => state.questions);
  
    const [check, setChecked] = useState(undefined)

    const { result } = useSelector(state => state.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    /** next button event handler */
    function onNext(){
        if(trace < queue.length){
            /** increase the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion());

            /** insert a new result in the array.  */
            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }
     
        /** reset the value of the checked variable */
        setChecked(undefined)
    }

    /** Prev button event handler */
    function onPrev(){
        if(trace > 0){
            /** decrease the trace value by one using MovePrevQuestion */
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        setChecked(check)
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        dispatch(setReviewDataAction({ result: result, correctAnswers: answers}));
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

    // if (!queue || queue.length === 0) {
    //     return <h3 className="text-light">Loading questions...</h3>;
    // }


  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        <Timer />
        {/* display questions */}
        <Questions onChecked={onChecked} />

        <div className='grid'>
            { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}
