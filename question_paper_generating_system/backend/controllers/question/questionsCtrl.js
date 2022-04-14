const expressAsyncHandler = require("express-async-handler");
const Question = require("../../model/question/question");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");


// ----------------------------------------------------------------
// Question create
//----------------------------------------------------------------

const newQuestion = expressAsyncHandler(async (req, res) => {

    try {
        //Insert new question
        const question = await Question.create({

            question: req?.body?.question,
            question_type: req?.body?.question_type,
            weightage: req?.body?.weightage,
            diffculty_level: req?.body?.diffculty_level,
        });
        res.json(question);
    } catch (error) {
        res.json(error);
    }
});

module.exports = {
    newQuestion,

};