import { postServerData } from '../helper/Helper'
import * as Action from '../redux/Result_reducer'
import { deleteServerData } from '../helper/Helper';

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
export const usePublishResult = () =>  { return async (resultData, quizId) => {
    const { result, username } = resultData;
     (async () => {
        try {
            if(result.length === 0 && !username) throw new Error("Couldn't get Result");
            await postServerData(`${import.meta.env.VITE_SERVER_HOSTNAME}/api/result/${quizId}`, resultData, data => data);
        } catch (error) {
            console.error(error);
        }
    })();
    }
}

// export const usePublishAiResult = () =>  { return async (resultData, quizId) => {
//     const { result, username } = resultData;
//      (async () => {
//         try {
//             if(result.length === 0 && !username) throw new Error("Couldn't get Result");
//             await postServerData(`${import.meta.env.VITE_SERVER_HOSTNAME}/api/ai/result`, resultData, data => data);
//         } catch (error) {
//             console.error(error);
//         }
//     })();
//     }
// }

// Example usage
export const deleteAiQuestions = async () => {
    try {
        const response = await deleteServerData(`${import.meta.env.VITE_SERVER_HOSTNAME}/api/ai/questions`);
        console.log("Delete successful:", response);
    } catch (error) {
        console.error("Delete failed:", error);
    }
};

export const deleteAiResults = async (quizId) => {
    try {
        const response = await deleteServerData(`${import.meta.env.VITE_SERVER_HOSTNAME}/api/result/${quizId}`);
        console.log("Delete successful:", response);
    } catch (error) {
        console.error("Delete failed:", error);
    }
}