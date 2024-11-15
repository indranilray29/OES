// src/components/GenerateQuizForm.js
import React, { useState } from 'react';
import { postServerData } from '../helper/Helper';

export default function AiQuizForm() {
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('easy');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the backend API
            const response = await postServerData(`${import.meta.env.VITE_SERVER_HOSTNAME}/api/ai/questions`, {
                topic,
                numQuestions,
                difficulty
            });
            console.log("Quiz generated:", response.data);
            alert("Quiz has been successfully generated!");
        } catch (error) {
            console.error("Error generating quiz:", error);
            alert("Failed to generate quiz.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Topic:
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
            </label>
            <label>
                Number of Questions:
                <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} required />
            </label>
            <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <button type="submit">Generate Quiz</button>
        </form>
    );
}
