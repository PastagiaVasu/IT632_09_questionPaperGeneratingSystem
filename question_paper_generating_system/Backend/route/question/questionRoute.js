const express = require('express');
const {
    newSubjectiveQuestion,
    editSubjectiveQuestion,
    newObjectiveQuestion,
    editObjectiveQuestion,
    viewQuestionAnswer,
} = require("../../controllers/question/questionsCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const questionRoutes = express.Router();

questionRoutes.post("/newSubjectiveQuestion", authMiddleware, newSubjectiveQuestion);
questionRoutes.post("/editSubjectiveQuestion", authMiddleware, editSubjectiveQuestion);
questionRoutes.post("/newObjectiveQuestion", authMiddleware, newObjectiveQuestion);
questionRoutes.post("/editObjectiveQuestion", authMiddleware, editObjectiveQuestion);
questionRoutes.post("/viewQuestionAnswer", authMiddleware, viewQuestionAnswer);

module.exports = questionRoutes;