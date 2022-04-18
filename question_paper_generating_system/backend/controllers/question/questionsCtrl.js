const expressAsyncHandler = require("express-async-handler");
const Question = require("../../model/question/question");
const Answer = require("../../model/answer/answer");
const User = require("../../model/user/user");
const Subject = require("../../model/subject/subject");
const userSubject = require("../../model/subject/user_subject");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");


// ----------------------------------------------------------------
// Question create - subjective
//----------------------------------------------------------------

const newSubjectiveQuestion = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });
    // const subject = await Subject.findOne({ _id: req?.body?.subject_id });
    const userSub = await userSubject.findOne({ user_id: userFound._id, subject_id: req?.body?.subject_id });

    if (!userSub) {
        res.status(401);
        throw new Error("You are not allowed");
    }
    if (userFound && userFound.status && !userFound.role) {

        try {
            // Insert new question
            const question = await Question.create({

                user_subject_id: userSub._id,
                question: req?.body?.question,
                type: true,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                diffculty: req?.body?.diffculty,
            });

            const que = await Question.findOne({ user_subject_id: userSub._id, question: req?.body?.question });

            const answer = await Answer.create({

                question_id: que._id,
                answer: req?.body?.answer,
                right: true,
            });
            res.status(200).send("Question added successfully");
        } catch (error) {
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

// ----------------------------------------------------------------
// Question edit - subjective
//----------------------------------------------------------------

const editSubjectiveQuestion = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });
    const question = await Question.findOne({ _id: req?.body?.question_id });

    if (!question) {
        res.status(401);
        throw new Error("Question not found");
    }
    if (userFound && userFound.status && !userFound.role) {

        try {
            // Edit question
            const que = await Question.findByIdAndUpdate(
                question._id, {

                user_subject_id: req?.body?.user_subject_id,
                question: req?.body?.question,
                type: true,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                diffculty: req?.body?.diffculty,
                status: req?.body?.que_status,
            });

            const ans = await Answer.findOne({ _id: req?.body?.answer_id, question_id: question._id });

            if (!ans) {
                res.status(401);
                throw new Error("Answer not found");
            }
            const answer = await Answer.findByIdAndUpdate(
                ans._id, {
                question_id: question._id,
                answer: req?.body?.answer,
                right: req?.body?.right,
                status: req?.body?.ans_status,
            });
            res.status(200).send("Question updated successfully");
        } catch (error) {
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

// ----------------------------------------------------------------
// Question create - Objective
//----------------------------------------------------------------

const newObjectiveQuestion = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });
    // const subject = await Subject.findOne({ _id: req?.body?.subject_id });
    const userSub = await userSubject.findOne({ user_id: userFound._id, subject_id: req?.body?.subject_id });

    if (!userSub) {
        res.status(401);
        throw new Error("You are not allowed");
    }
    if (userFound && userFound.status && !userFound.role) {

        try {
            // Insert new question
            const question = await Question.create({

                user_subject_id: userSub._id,
                question: req?.body?.question,
                type: false,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                diffculty: req?.body?.diffculty,
            });

            const que = await Question.findOne({ user_subject_id: userSub._id, question: req?.body?.question });

            const answers = req?.body?.answers;
            answers.forEach((ans) => {
                const answer = Answer.create({

                    question_id: que._id,
                    answer: ans?.answer,
                    right: ans?.right,
                });
            });
            res.status(200).send("Question added successfully");
        } catch (error) {
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

// ----------------------------------------------------------------
// Question edit - subjective
//----------------------------------------------------------------

const editObjectiveQuestion = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });
    const question = await Question.findOne({ _id: req?.body?.question_id });

    if (!question) {
        res.status(401);
        throw new Error("Question not found");
    }
    if (userFound && userFound.status && !userFound.role) {

        try {
            // Edit question
            const que = await Question.findByIdAndUpdate(
                question._id, {

                user_subject_id: req?.body?.user_subject_id,
                question: req?.body?.question,
                type: false,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                diffculty: req?.body?.diffculty,
                status: req?.body?.que_status,
            });


            const anss = req?.body?.answers;
            // console.log(anss);

            if (!anss) {
                res.status(401);
                throw new Error("Answer not found");
            }
            anss.forEach(async (ans) => {

                const answr = await Answer.findOne({ _id: ans.ans_id });
                console.log(ans.ans_id);
                if (!answr) {
                    const answer = await Answer.create({

                        question_id: question._id,
                        answer: ans?.answer,
                        right: ans?.right,
                    });
                    console.log("ans added");
                } else {
                    const answer = await Answer.findByIdAndUpdate(
                        ans.ans_id, {
                        question_id: ans.question_id,
                        answer: ans?.answer,
                        right: ans?.right,
                        status: ans?.ans_status,
                    });
                    console.log("ans updated");
                }
            });

            res.status(200).send("Question updated successfully");
        } catch (error) {
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

module.exports = {
    newSubjectiveQuestion,
    editSubjectiveQuestion,
    newObjectiveQuestion,
    editObjectiveQuestion,
};