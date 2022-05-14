const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/user");
const Paper = require("../../model/paper/paper");
const Answer = require("../../model/answer/answer");
const Question = require("../../model/question/question");
const PaperDetail = require("../../model/paper/paper_detail");
const validateMongodbID = require("../../utils/validateMongodbID");

// ----------------------------------------------------------------
//  generate automatic question paper
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

                var rand_array = [];
                while (sections[0] < section[i][0]) {

                    do {
                        var r = (Math.random() * marks2.length) | 0;
                    } while (rand_array.includes(r));

                    rand_array.push(r);
                    var rand = marks2[r];

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

                    do {
                        var r = (Math.random() * marks3.length) | 0;
                    } while (rand_array.includes(r));

                    rand_array.push(r);
                    var rand = marks3[r];

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

                        do {
                            var r = (Math.random() * marks5.length) | 0;
                        } while (rand_array.includes(r));

                        rand_array.push(r);
                        var rand = marks5[r];

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
//  generate Customise question paper
// ----------------------------------------------------------------

const generateCustomisePaperCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {
        try {
            const marks2 = req?.body?.marks2;
            const marks3 = req?.body?.marks3;
            const marks5 = req?.body?.marks5;
            const marks = 2 * (marks2) + 3 * (marks3) + 5 * (marks5);

            //Register user
            // console.log("User ID : ");
            // console.log("Total marks : "+ marks);

            const paper = await Paper.create({
                user_id: id,
                subject_id: req?.body?.subject_id,
                difficulty: req?.body?.difficulty,
                marks: marks,
                type: req?.body?.type,
                exam_date: req?.body?.exam_date,
            });
            // console.log("Paper : "+ paper);
            var section = [marks2, marks3, marks5];


            var sections = [0, 0, 0];   //2, 3, 5 marks counter

            // difficulty level question
            marks2_obj = await Question.find({
                mark: 2,
                difficulty: paper.difficulty,
                subject_id: paper.subject_id,
                type: paper.type,
                status: true,
            });

            console.log("Marks 2 : " + marks2_obj);
            console.log("2mark question fetched");

            var rand_array = [];
            while (sections[0] < marks2) {

                do {
                    var r = (Math.random() * marks2_obj.length) | 0;
                } while (rand_array.includes(r));

                rand_array.push(r);
                var rand = marks2_obj[r];

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
            console.log("2 marks Random : " + rand_array);
            rand_array = [];

            marks3_obj = await Question.find({
                mark: 3,
                difficulty: paper.difficulty,
                subject_id: paper.subject_id,
                type: paper.type,
                status: true,
            });

            console.log("3mark question fetched");

            while (sections[1] < marks3) {

                do {
                    var r = (Math.random() * marks3_obj.length) | 0;
                } while (rand_array.includes(r));

                rand_array.push(r);
                var rand = marks3_obj[r];

                // console.log("3 Marks random question no : "+r);
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
            console.log("3 marks Random : " + rand_array);
            rand_array = [];

            marks5_obj = await Question.find({
                mark: 5,
                difficulty: paper.difficulty,
                subject_id: paper.subject_id,
                type: paper.type,
                status: true,
            });

            console.log("5mark question fetched");

            while (sections[2] < marks5) {

                do {
                    var r = (Math.random() * marks5_obj.length) | 0;
                } while (rand_array.includes(r));

                rand_array.push(r);
                var rand = marks5_obj[r];
                console.log("5 marks Random : " + rand_array);

                // console.log("5 Marks random question no : "+r);

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
            console.log("5mark done");
            console.log("5 marks Random : " + rand_array);
            rand_array = [];

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

    if (userFound && userFound.status) {
        try {
            //view paper
            const paperDetails = await PaperDetail.find({ paper_id: req?.body?.paper_id }).distinct("question_id");

            if (!paperDetails) {
                res.status(401);
                throw new Error("Paper details not found");
            }

            let queAnswers = []
            for (let i = 0; i < paperDetails.length; i++) {
                
                const question = await Question.findOne({ _id: paperDetails[i].question_id });
                const answer = await PaperDetail.find({ paper_id: req?.body?.paper_id, question_id: paperDetails[i].question_id });

                let ans = []

                for (let j = 0; j < answer.length; j++) {

                    const a = await Answer.find({ _id: answer[j].answer_id });
                    ans.push([a]);
                }

                queAnswers.push([question, ans])
            }


            res.status(200).json(queAnswers);
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

    if (userFound && userFound.status) {
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

    if (userFound && userFound.status) {
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

//-----------------------------------------------------------
// fetch answer from question
//-----------------------------------------------------------

const fetchAnswerFromQuestionCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status) {
        try {
            const answer = await Answer.find({ question_id: req?.body?.question_id });  // fetch all feedbacks
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
    viewPaperCtrl,
    fetchAnswerFromQuestionCtrl,
    generateCustomisePaperCtrl
};