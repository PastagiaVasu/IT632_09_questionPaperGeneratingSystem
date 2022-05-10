const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/user");
const Paper = require("../../model/paper/paper");
const Answer = require("../../model/answer/answer");
const Question = require("../../model/question/question");
const PaperDetail = require("../../model/paper/paper_detail");
const validateMongodbID = require("../../utils/validateMongodbID");

// ----------------------------------------------------------------
//  generate question paper
// ----------------------------------------------------------------

const generatePaperCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {
        try {
            //Register user
            const paper = await Paper.create({
                user_id: id,
                subject_id: req?.body?.subject_id,
                difficulty: req?.body?.difficulty,
                marks: req?.body?.marks,
                type: req?.body?.type,
                exam_date: req?.body?.exam_date,
            });

            var difficulties = [];

            if (paper.difficulty == 1) {
                difficulties[0] = 1;      // 50% easy
                difficulties[1] = 2;      // 30% med
                difficulties[2] = 3;      // 20% hard
            } else if (paper.difficulty == 2) {
                difficulties[0] = 2;      // 50% med
                difficulties[1] = 1;      // 30% easy
                difficulties[2] = 3;      // 20% hard
            } else if (paper.difficulty == 3) {
                difficulties[0] = 3;      // 50% hard
                difficulties[1] = 1;      // 30% easy
                difficulties[2] = 2;      // 20% med
            }

            var marks2, marks3, marks5;
            var section = [[3, 3, 2], [3, 3], [1, 1, 1]];

            for (var i = 0; i < 3; i++) {

                var sections = [0, 0, 0];
                console.log("i ", i);
                // difficulty level question
                marks2 = await Question.find({
                    mark: 2,
                    difficulty: difficulties[i],
                    subject_id: paper.subject_id,
                    type: paper.type,
                    status: true,
                });

                console.log("2mark question fetched");

                while (sections[0] < section[i][0]) {

                    var rand = marks2[(Math.random() * marks2.length) | 0];
                    const que = await PaperDetail.find({ paper_id: paper._id, question_id: rand._id });
                    if (que) {
                        const ans = await Answer.find({ question_id: rand._id, status: true });

                        ans.forEach(async (ansr) => {
                            const insertedData = await PaperDetail.create({

                                paper_id: paper._id,
                                question_id: rand._id,
                                answer_id: ansr._id

                            });
                            console.log("Question: ", rand.question);
                            console.log("Answer: ", ansr.answer);
                        });

                        sections[0]++;
                    }
                }

                console.log("2mark done");

                marks3 = await Question.find({
                    mark: 3,
                    difficulty: difficulties[i],
                    subject_id: paper.subject_id,
                    type: paper.type,
                    status: true,
                });

                console.log("3mark question fetched");

                while (sections[1] < section[i][1]) {

                    var rand = marks3[(Math.random() * marks3.length) | 0];
                    const que = await PaperDetail.find({ paper_id: paper._id, question_id: rand._id });
                    if (que) {
                        const ans = await Answer.find({ question_id: rand._id, status: true });

                        ans.forEach(async (ansr) => {
                            const insertedData = await PaperDetail.create({

                                paper_id: paper._id,
                                question_id: rand._id,
                                answer_id: ansr._id
                            });
                            console.log("Question: ", rand.question);
                            console.log("Answer: ", ansr.answer);
                        });

                        sections[1]++;
                    }
                }
                console.log("3mark done");

                if (i != 1) {
                    marks5 = await Question.find({
                        mark: 5,
                        difficulty: difficulties[i],
                        subject_id: paper.subject_id,
                        type: paper.type,
                        status: true,
                    });

                    console.log("5mark question fetched");

                    while (sections[2] < section[i][2]) {

                        var rand = marks5[(Math.random() * marks5.length) | 0];
                        const que = await PaperDetail.find({ paper_id: paper._id, question_id: rand._id });
                        if (que) {
                            const ans = await Answer.find({ question_id: rand._id, status: true });

                            ans.forEach(async (ansr) => {
                                const insertedData = await PaperDetail.create({

                                    paper_id: paper._id,
                                    question_id: rand._id,
                                    answer_id: ansr._id
                                });
                                console.log("Question: ", rand.question);
                                console.log("Answer: ", ansr.answer);
                            });

                            sections[2]++;
                        }
                    }
                }

                console.log("5mark done");
            }
            // console.log(paper._id);
            // console.log(marks2);
            // console.log(marks3);
            // console.log(marks5);

            res.status(200).json(paper);
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
//  view question paper
// ----------------------------------------------------------------

const viewPaperCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {
        try {
            //view paper
            const paperDetails = await PaperDetail.find({ paper_id: req?.body?.paper_id });
            res.status(200).json(paperDetails);
        } catch (error) {
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

//-----------------------------------------------------------
// fetch question
//-----------------------------------------------------------

const fetchQuestionCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {
        try {
            const question = await Question.find({ _id: req?.body?.question_id });  // fetch all feedbacks
            res.status(200).json(question);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

//-----------------------------------------------------------
// fetch answer
//-----------------------------------------------------------

const fetchAnswerCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {
        try {
            const answer = await Answer.find({ _id: req?.body?.answer_id });  // fetch all feedbacks
            res.status(200).json(answer);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

module.exports = {
    generatePaperCtrl,
    fetchQuestionCtrl,
    fetchAnswerCtrl,
    viewPaperCtrl
};