import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import AiQuestions from "../models/aiQuestionSchema.js";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Dynamically load quiz data based on quizId
async function loadQuizData(quizId) {
    try {
        // Use dynamic import based on quizId
        const quizData = await import(`../database/data${quizId}.js`);
        
        // Since data.js now exports an object, access quizId, questions, and answers
        const { quizId: id, questions, answers } = quizData.default;
        
        // Ensure the loaded quizId matches the requested quizId
        if (id !== quizId) {
            throw new Error(`Quiz ID mismatch: Expected ${quizId}, but found ${id}`);
        }

        return { quizId: id, questions, answers };
    } catch (error) {
        console.error(`Error loading quiz data for quizId ${quizId}:`, error);
        throw new Error("Quiz data not found.");
    }
}

/** get all questions for a specific quiz */
export async function getQuestions(req, res) {
    const { quizId } = req.params;
    if (!quizId) return res.status(400).json({ error: "quizId is required" });

    try {
        const questions = await Questions.find({ quizId });
        // const questions = await Questions.find({ quizId });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** insert questions for a specific quiz */
export async function insertQuestions(req, res) {
    const { quizId } = req.params;
    if (!quizId) return res.status(400).json({ error: "quizId is required" });

    try {
        const { questions, answers } = await loadQuizData(quizId);

        const data = await Questions.insertMany({ quizId, questions, answers });
        res.json({ data });
    } catch (error) {
        console.error("Error inserting questions:", error);
        res.status(500).json({ error: error.message });
    }
}

/** delete all questions for a specific quiz */
export async function dropQuestions(req, res) {
    const { quizId } = req.params;
    if (!quizId) return res.status(400).json({ error: "quizId is required" });

    try {
        await Questions.deleteMany({ quizId });
        res.json({ msg: "Questions Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** get all results for a specific quiz */
export async function getResult(req, res) {
    const { quizId } = req.params;
    if (!quizId) return res.status(400).json({ error: "quizId is required" });

    try {
        const results = await Results.find({ quizId });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// const { topic, numberOfQuestions, difficulty } = req.body;
//     // console.log("Hello");
/** store result for a specific quiz */
export async function storeResult(req, res) {
    const { username, result, attempts, points, achieved } = req.body;
    const { quizId } = req.params;
    if (!quizId) return res.status(400).json({ error: "quizId is required" });

    try {
        const savedResult = await Results.create({ username, result, attempts, points, achieved, quizId });
        res.json({ msg: "Result Saved Successfully!", data: savedResult });
    } catch (error) {
        console.error("Error saving result:", error);
        res.status(500).json({ error: error.message });
    }
}

/** delete all results for a specific quiz */
export async function dropResult(req, res) {
    const { quizId } = req.params;

    if (!quizId) return res.status(400).json({ error: "quizId is required" });

    try {
        await Results.deleteMany({ quizId });
        res.json({ msg: "Result Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// export async function generateAiQuiz(req, res) {
//     

//     try {
//         // const { topic, numberOfQuestions, difficulty } = req.body;

//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         const prompt = `Create a quiz on ${topic} with ${numberOfQuestions} questions of ${difficulty} difficulty level. 
//         Format the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices).`;

//         const response = await model.generateContent(prompt);
//         // console.log("Raw response:", response);

//         const quizData = JSON.parse(response.text());
//         const {quizId, qustions, answers} = quizData;
//         const data = await Questions.insertMany({ quizId, qustions, answers });
//         res.json({ data });

//         // res.json( quizData );

//     } catch (error) {
//         res.status(500).json({ error: error.message });e
//     }
// }


export async function generateAiQuiz(req,res) {
    const { topic, numQuestions, difficulty } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
    
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
    
        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

    try{
        
    
        const chatSession = model.startChat({
        generationConfig,
        history: [
            {
            role: "user",
            parts: [
                {text: "Create a quiz on ${topic} with ${numQuestions} questions of ${difficulty} difficulty level. \n  Format the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices)."},
            ],
            },
            {
            role: "model",
            parts: [
                {text: "Please provide the following information to generate the quiz:\n\n* *topic:*  The subject or theme of the quiz. (e.g., \"History\", \"Science\", \"Movies\")\n* *numQuestions:* The desired number of questions in the quiz. (e.g., 5, 10, 20)\n* *difficulty:* The desired difficulty level of the questions. (e.g., \"easy\", \"medium\", \"hard\")\n\nOnce you provide these details, I can generate a JSON object containing the quiz. \n"},
            ],
            },
            {
            role: "user",
            parts: [
                {text: "Create a quiz on {Javascript} with  {5} questions of {medium} difficulty level.\nFormat the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices)."},
            ],
            },
            {
            role: "model",
            parts: [
                {text: "json\n{\n  \"quizId\": \"javascript-medium-quiz\",\n  \"questions\": [\n    {\n      \"id\": 1,\n      \"question\": \"What is the output of the following code?\\njavascript\\nconsole.log(typeof NaN);\\n\",\n      \"options\": [\"number\", \"string\", \"undefined\", \"object\"]\n    },\n    {\n      \"id\": 2,\n      \"question\": \"Which method is used to add a new element to the end of an array?\",\n      \"options\": [\"push\", \"pop\", \"shift\", \"unshift\"]\n    },\n    {\n      \"id\": 3,\n      \"question\": \"What is the difference between '==' and '===' in JavaScript?\",\n      \"options\": [\n        \"They are the same, there is no difference.\",\n        \"'==' checks for strict equality, while '===' checks for loose equality.\",\n        \"'===' checks for strict equality, while '==' checks for loose equality.\",\n        \"They both check for loose equality.\"\n      ]\n    },\n    {\n      \"id\": 4,\n      \"question\": \"What is the purpose of the 'this' keyword in JavaScript?\",\n      \"options\": [\n        \"It refers to the current function.\",\n        \"It refers to the global object.\",\n        \"It refers to the object that the function is a property of.\",\n        \"It refers to the current execution context.\"\n      ]\n    },\n    {\n      \"id\": 5,\n      \"question\": \"Which of the following is NOT a valid way to declare a variable in JavaScript?\",\n      \"options\": [\"var\", \"let\", \"const\", \"define\"]\n    }\n  ],\n  \"answers\": [\n    1,\n    0,\n    2,\n    2,\n    3\n  ]\n}\n \n"},
            ],
            },
        ],
        });
        
        const prompt = `Create a quiz on ${topic} with  ${numQuestions} questions of ${difficulty} difficulty level.\nFormat the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices).`;

        const result = await chatSession.sendMessage(prompt);
        const resp = result.response.text();
        console.log(resp);
        // res.json(JSON.parse(resp));
        // const { quizId, questions, answers } = JSON.parse(resp);
        // const data =  await Questions.insertMany({ quizId, questions, answers });
        // Parse the JSON string

        // Clean the response to extract the JSON part
        const jsonString = resp
            .replace(/```json\n/, '') // Remove the opening ```json
            .replace(/```/, '') // Remove the closing ```
            .trim(); // Trim whitespace

         const quizData = JSON.parse(jsonString);

            // Access the properties of the parsed JSON object
        const { quizId, questions, answers } = quizData;
        const data = await AiQuestions.insertMany({ quizId, questions, answers });
        // res.json({ data });
        res.json( {data} );
        
    }
    
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getAiQuestions(req, res) {
    
    try {
        const questions = await AiQuestions.find();
        // const questions = await Questions.find({ quizId });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function dropAiQuestions(req, res) {
   
    try {
        await AiQuestions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}