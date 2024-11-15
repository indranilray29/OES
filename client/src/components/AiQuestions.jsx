import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/** Custom Hook */
import { useFetchAiQuestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/SetResult'

function AiQuestions({ onChecked }) {
    const [{ isLoading, apiData, serverError}] = useFetchAiQuestion();

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);


    const questions = useSelector(state => state.questions.queue[state.questions.trace]);
    // const questions = apiData;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateResult({ trace, checked }));
        console.log(questions);
    }, [checked])
    
    function onSelect(i){
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked }))
    }


    if(isLoading) return <h3 className='text-light1'>isLoading</h3>
    if(serverError) return <h3 className='text-light1'>{serverError || "Unknown Error"}</h3>

  return (
    <div className='questions'>
        <h2 className='text-light1'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />

                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}



export default AiQuestions