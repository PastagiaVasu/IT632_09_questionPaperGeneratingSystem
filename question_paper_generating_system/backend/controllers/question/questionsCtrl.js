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

                subject_id: userSub?.subject_id,
                user_id: userSub?.user_id,
                question: req?.body?.question,
                type: true,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                difficulty: req?.body?.difficulty,
            })

            const answer = await Answer.create({

                question_id: question._id,
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

                subject_id: req?.body?.subject_id,
                user_id: id,
                question: req?.body?.question,
                type: true,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                difficulty: req?.body?.difficulty,
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

                subject_id: userSub?.subject_id,
                user_id: userSub?.user_id,
                question: req?.body?.question,
                type: false,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                difficulty: req?.body?.difficulty,
            })

            const answers = req?.body?.answers;
            answers.forEach((ans) => {
                const answer = Answer.create({

                    question_id: question._id,
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
// Question edit - Objective
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
                subject_id: req?.body?.subject_id,
                user_id: id,
                question: req?.body?.question,
                type: false,                        // true for subjective | false for objective
                mark: req?.body?.mark,
                difficulty: req?.body?.difficulty,
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
            res.status(error).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

// ----------------------------------------------------------------
// view Question - Answers
//----------------------------------------------------------------

const viewQuestionAnswer = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    // const filter = {
    //     "question": ,
    //     "type":,
    //     "mark": ,
    //     "difficulty" : ,
    // };

    const userFound = await User.findOne({ _id: id });
    var question = await Question.find(req?.body?.filter);

    var queAnsArr = [];
    // console.log(question);

    if (!question) {
        res.status(401);
        throw new Error("Question not found");
    }
    if (userFound && userFound.status) {
        try {

            // for (var i = 0; i < question.length; i++) {
            //     var ans = await Answer.find({ question_id: question[i]._id });
            //     // console.log(ans);
            //     question[i].answers = [ans];
            //     question[i].ddd = "dsf";
            // }

            question.forEach(async (que) => {
                var ans = await Answer.find({ question_id: que._id });
                // que.answers = ans;
                // Object.assign(que, ans);
                queAnsArr.push({ "Que": que.question, "Ans": ans });
                // console.log(que);
                // console.log(ans);
                console.log(queAnsArr);
            });

            console.log(queAnsArr);
            // console.log("ans", question);

            res.status(200).send(question);
        } catch (error) {
            res.status(401).json(error);
        };
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
    viewQuestionAnswer,
};