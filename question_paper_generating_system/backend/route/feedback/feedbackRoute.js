const express = require('express');
const {
    newFeedbackCtrl,
    fetchFeedbackCtrl,
} = require("../../controllers/feedback/feedbackCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router();

userRoutes.post("/newFeedback", newFeedbackCtrl);
userRoutes.get("/allFeedback", authMiddleware, fetchFeedbackCtrl);


module.exports = userRoutes;