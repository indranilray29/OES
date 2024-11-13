import React from "react";
import { useSelector } from "react-redux";

const ReviewAnswers = () => {
    const { result, correctAnswers, reviewMode } = useSelector((state) => state.result);
    const { queue } = useSelector((state) => state.questions); // Assuming queue holds the question objects

    if (!reviewMode) return null; // Do not display anything if reviewMode is false

    return (
        <div style={{ padding: "20px", backgroundColor: "#2d2d2d" }}>
            <h2 style={{ color: "white" }}>Review Your Answers</h2>
            {queue.map((question, index) => {
                const userAnswer = result[index];
                const correctAnswer = correctAnswers[index];
                const isCorrect = userAnswer === correctAnswer; // Check if the user's answer is correct

                return (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <p style={{ color: "white", fontSize: "18px" }}>Question {index + 1}: {question.question}</p>

                        {question.options.map((option, optionIndex) => {
                            const isUserAnswer = result[index] === optionIndex; // Check if this option was selected by the user
                            const isCorrectOption = correctAnswers[index] === optionIndex; // Check if this option is the correct answer

                            return (
                                <div key={optionIndex} style={{ marginLeft: "20px" }}>
                                    <label
                                        style={{
                                            color: isCorrectOption
                                                ? "green" // Correct answer in green
                                                : isUserAnswer && !isCorrect
                                                ? "red" // User's incorrect answer in red
                                                : "white", // Default color for other options
                                            fontWeight: isCorrectOption || isUserAnswer ? "bold" : "normal", // Bold for selected or correct answers
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            checked={isCorrectOption || isUserAnswer} // Checked if correct or if it's the user's answer
                                            style={{
                                                marginRight: "10px",
                                                accentColor: isCorrectOption
                                                    ? "green"
                                                    : isUserAnswer
                                                    ? "red"
                                                    : "black", // Accent color for the radio button
                                            }}
                                            disabled // Disable the radio button to prevent interaction
                                        />
                                        {option}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ReviewAnswers;
