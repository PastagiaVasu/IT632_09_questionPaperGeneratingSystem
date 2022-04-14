const express = require('express');
const {
    newQuestion,
} = require("../../controllers/question/questionsCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const questionRoutes = express.Router();

questionRoutes.post("/newQuestion", newQuestion);


module.exports = questionRoutes;