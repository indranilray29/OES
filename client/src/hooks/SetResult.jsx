import { postServerData } from '../helper/Helper'
import * as Action from '../redux/Result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */
export const usePublishResult = (resultData, quizId) => {
    const { result, username } = resultData;
    return (async () => {
        try {
            if(result.length === 0 && !username) throw new Error("Couldn't get Result");
            await postServerData(`${import.meta.env.VITE_SERVER_HOSTNAME}/api/result/${quizId}`, resultData, data => data);
        } catch (error) {
            console.error(error);
        }
    })();
}

