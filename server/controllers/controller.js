import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";

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
