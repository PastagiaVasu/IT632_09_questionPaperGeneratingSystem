const express = require('express');
const {
    generatePaperCtrl,
    generateCustomisePaperCtrl,
    fetchQuestionCtrl,
    fetchAnswerCtrl,
    viewPaperCtrl,
    fetchAnswerFromQuestionCtrl
} = require("../../controllers/paper/paperCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const paperRoutes = express.Router();

paperRoutes.post("/generatePaper", authMiddleware, generatePaperCtrl);
paperRoutes.post("/generateCustomisePaper", authMiddleware, generateCustomisePaperCtrl);
paperRoutes.post("/fetchQuestion", authMiddleware, fetchQuestionCtrl);
paperRoutes.post("/fetchAnswer", authMiddleware, fetchAnswerCtrl);
paperRoutes.post("/viewPaper", authMiddleware, viewPaperCtrl);
paperRoutes.post("/fetchAnswerFromQuestion", authMiddleware, fetchAnswerFromQuestionCtrl);

module.exports = paperRoutes;