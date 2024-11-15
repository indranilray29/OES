import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai;

/** import connection file */
import connect from './database/conn.js';

const app = express()


/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();


/** appliation port */
const port = process.env.PORT || 8080;


/** routes */
app.use('/api', router) /** apis */


app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

// app.listen(port, () => {
//                 console.log(`Server connected to http://localhost:${port}`)
//             })


/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})

// async function generateAiQuiz (topic, numberOfQuestions, difficulty){
//     try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `Create a quiz on ${topic} with ${numberOfQuestions} questions of ${difficulty} difficulty level. 
//     Format the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices).`;

//     const response = await model.generateContent(prompt);
//     console.log(response);
    
//     // const quizData = JSON.parse(response.text);
//     // console.log(quizData)
//     }
//     catch(error){
//         console.log(error);
        
//     }
// }

// generateAiQuiz("Javascript", 5, "easy")

// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
  
//   const apiKey = process.env.GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//   async function run(topic, numQuestions, difficulty) {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {text: "Create a quiz on ${topic} with ${numQuestions} questions of ${difficulty} difficulty level. \n  Format the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices)."},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "Please provide the following information to generate the quiz:\n\n* *topic:*  The subject or theme of the quiz. (e.g., \"History\", \"Science\", \"Movies\")\n* *numQuestions:* The desired number of questions in the quiz. (e.g., 5, 10, 20)\n* *difficulty:* The desired difficulty level of the questions. (e.g., \"easy\", \"medium\", \"hard\")\n\nOnce you provide these details, I can generate a JSON object containing the quiz. \n"},
//           ],
//         },
//         {
//           role: "user",
//           parts: [
//             {text: "Create a quiz on {Javascript} with  {5} questions of {medium} difficulty level.\nFormat the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices)."},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "json\n{\n  \"quizId\": \"javascript-medium-quiz\",\n  \"questions\": [\n    {\n      \"id\": 1,\n      \"question\": \"What is the output of the following code?\\njavascript\\nconsole.log(typeof NaN);\\n\",\n      \"options\": [\"number\", \"string\", \"undefined\", \"object\"]\n    },\n    {\n      \"id\": 2,\n      \"question\": \"Which method is used to add a new element to the end of an array?\",\n      \"options\": [\"push\", \"pop\", \"shift\", \"unshift\"]\n    },\n    {\n      \"id\": 3,\n      \"question\": \"What is the difference between '==' and '===' in JavaScript?\",\n      \"options\": [\n        \"They are the same, there is no difference.\",\n        \"'==' checks for strict equality, while '===' checks for loose equality.\",\n        \"'===' checks for strict equality, while '==' checks for loose equality.\",\n        \"They both check for loose equality.\"\n      ]\n    },\n    {\n      \"id\": 4,\n      \"question\": \"What is the purpose of the 'this' keyword in JavaScript?\",\n      \"options\": [\n        \"It refers to the current function.\",\n        \"It refers to the global object.\",\n        \"It refers to the object that the function is a property of.\",\n        \"It refers to the current execution context.\"\n      ]\n    },\n    {\n      \"id\": 5,\n      \"question\": \"Which of the following is NOT a valid way to declare a variable in JavaScript?\",\n      \"options\": [\"var\", \"let\", \"const\", \"define\"]\n    }\n  ],\n  \"answers\": [\n    1,\n    0,\n    2,\n    2,\n    3\n  ]\n}\n \n"},
//           ],
//         },
//       ],
//     });
  
//     const result = await chatSession.sendMessage("Create a quiz on {Javascript} with  {5} questions of {easy} difficulty level.\nFormat the output as a JSON object with 'quizId', 'questions' (each with 'id', 'question', and 'options'), and 'answers' (array of correct option indices).");
//     console.log(result.response.text());
//   }
  
//   run("Javascript", 5, "easy");