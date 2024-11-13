import { createSlice } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        result : [],
        correctAnswers: [],
        reviewMode: false,
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        pushResultAction : (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } = action.payload;
            state.result.fill(checked, trace, trace + 1)
        },
        resetResultAction : () => {
            return {
                userId : null,
                result : [],
                correctAnswers: [],
                reviewMode: false
            }
        },
        setReviewDataAction: (state, action) => {
            const { result, correctAnswers } = action.payload;
            state.result = result;
            state.correctAnswers = correctAnswers;
            state.reviewMode = true; // Enable review mode
        },
    }
})

export const { setUserId, pushResultAction, resetResultAction, updateResultAction, setReviewDataAction } = resultReducer.actions;

export default resultReducer.reducer;
