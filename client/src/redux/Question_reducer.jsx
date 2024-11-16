import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const questionReducer = createSlice({
    name: 'questions',
    initialState : {
        queue: [],
        answers : [],
        trace : 0,
        timer: 30,
        isSubmitted: false,
        activeQuizId: null
    },
    reducers : {
        startExamAction : (state, action) => {
            let { question, answers, activeQuizId} = action.payload
            return {
                ...state,
                queue : question,
                answers,
                activeQuizId
            }
        },
        setActiveQuiz: (state, action) => {
            state.activeQuizId = action.payload;
        },
        moveNextAction : (state) => {
            return {
                ...state,
                trace : state.trace + 1
            }
        },
        movePrevAction : (state) => {
            return {
                ...state,
                trace : state.trace - 1
            }
        },
        resetAllAction : () => {
            return {
                queue: [],
                answers : [],
                trace : 0,
                timer: 30,
                activeQuizId: null
            }
        },
        startTimer(state) {
            state.timer = 15; // reset to 5 minutes
        },
        decrementTimer(state) {
            if (state.timer > 0) {
              state.timer -= 1;
            }
        },
        autoSubmitQuiz: (state) => {
            state.isSubmitted = true;
        }
    }
})

export const { startExamAction, setActiveQuiz, moveNextAction, movePrevAction, resetAllAction, startTimer, decrementTimer, autoSubmitQuiz } = questionReducer.actions;

export default questionReducer.reducer;