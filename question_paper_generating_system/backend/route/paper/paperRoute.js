const express = require('express');
const {
    generatePaperCtrl,
    fetchQuestionCtrl,
    fetchAnswerCtrl,
    viewPaperCtrl
} = require("../../controllers/paper/paperCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const paperRoutes = express.Router();

paperRoutes.post("/generatePaper", authMiddleware, generatePaperCtrl);
paperRoutes.post("/fetchQuestion", authMiddleware, fetchQuestionCtrl);
paperRoutes.post("/fetchAnswer", authMiddleware, fetchAnswerCtrl);
paperRoutes.post("/viewPaper", authMiddleware, viewPaperCtrl);

module.exports = paperRoutes;