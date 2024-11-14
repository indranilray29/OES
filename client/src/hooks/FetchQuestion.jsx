import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/Helper"; // Import helper functions

/** redux actions */
import * as Action from '../redux/Question_reducer';

/** fetch question hook to fetch API data and set value to store */
export const useFetchQuestion = (quizId) => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        if (!quizId) return;

        setGetData(prev => ({ ...prev, isLoading: true }));

        /** async function fetch backend data */
        (async () => {
            try {
                // Fetch the data for the specific quizId
                const [{ questions, answers }] = await getServerData(
                    `${import.meta.env.VITE_SERVER_HOSTNAME}/api/questions/${quizId}`,
                    // quizId, // Pass quizId to callback in case needed in helper functions
                );

                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: questions }));

                    // Dispatch action with quizId and data to store
                    dispatch(Action.startExamAction({ question: questions, answers, activeQuizId: quizId }));
                } else {
                    throw new Error("No Questions Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: error.message }));
            }
        })();
    }, [quizId, dispatch]); // Re-run the effect when quizId changes

    return [getData, setGetData];
};

/** MoveNextQuestion Dispatch function */
export const MoveNextQuestion = (quizId) => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction({ quizId })); /** Increase trace by 1 for the specific quizId */
    } catch (error) {
        console.log(error);
    }
};

/** MovePrevQuestion Dispatch function */
export const MovePrevQuestion = (quizId) => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction({ quizId })); /** Decrease trace by 1 for the specific quizId */
    } catch (error) {
        console.log(error);
    }
};
