import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useUser  } from '@clerk/clerk-react';

export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point){
    return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints){
    return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
}

/** check user auth  */
export function CheckUserExist({ children }) {
  const { isSignedIn } = useUser ();
  return isSignedIn ? children : <Navigate to={'/sign-in'} replace={true} />;
}

/** get server data */
export async function getServerData(url, callback){
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}


/** post server data */
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}

/** delete server data */
export async function deleteServerData(url, callback) {
    try {
        const response = await axios.delete(url);
        const data = response.data; // Get the data from the response
        return callback ? callback(data) : data; // Call the callback if provided
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error; // You can throw the error or handle it as needed
    }
}