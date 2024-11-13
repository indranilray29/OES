import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/Helper';
import { useSelector } from 'react-redux';

export default function ResultTable() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { activeQuizId } = useSelector(state => state.questions);

    useEffect(() => {
        // Clear previous data and set loading state to true
        setData([]);
        setLoading(true);

        // Fetch data from the server
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result/${activeQuizId}`, (res, err) => {
            if (err) {
                setError(err);
                setLoading(false);
                return;
            }
            setData(res);
            setLoading(false);
        });
    }, [activeQuizId]); // This will trigger a re-fetch whenever the active quiz ID changes
    // Empty dependency array ensures the effect runs once

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attempts</td>
                        <td>Earned Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    {/* If no data is found, show a message */}
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="4">No Data Found</td>
                        </tr>
                    ) : (
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td>{v?.achieved || ''}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
