
import mongoose from "mongoose";
const { Schema } = mongoose;

/** question model */
const questionModel = new Schema({
    quizId: {type: String },
    questions: { type : Array, default: []}, // create question with [] default value
    answers : { type : Array, default: []},
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Question', questionModel);
