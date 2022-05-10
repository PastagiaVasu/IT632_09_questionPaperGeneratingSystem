const express = require('express');
const {
    userRegisterCtrl,
    loginCtrl,
    fetchUserCtrl,
    userStatusCtrl,
    userQuestionCtrl,
    // deleteUserCtrl,
    // fetchUserDetailsCtrl,
    // userProfileCtrl,
    // updateUserCtrl,
} = require("../../controllers/user/userCtrl");

const {
    newFeedbackCtrl,
    fetchFeedbackCtrl,
} = require("../../controllers/feedback/feedbackCtrl");

const {
    userAddSubjectCtrl,
    newSubjectCtrl,
    userSubjectStatusCtrl,
    fetchSubjectCtrl,
    userSubjectCtrl,
} = require("../../controllers/subject/subjectCtrl");

const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginCtrl);
userRoutes.get("/allFaculties", authMiddleware, fetchUserCtrl);
userRoutes.get("/allQuestions", authMiddleware, userQuestionCtrl);
userRoutes.post("/changeStatus", authMiddleware, userStatusCtrl);
// userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
// userRoutes.put("/:id", authMiddleware, updateUserCtrl);
// userRoutes.delete("/:id", deleteUserCtrl);
// userRoutes.get("/:id", fetchUserDetailsCtrl);

userRoutes.post("/newFeedback", authMiddleware, newFeedbackCtrl);
userRoutes.get("/allFeedback", authMiddleware, fetchFeedbackCtrl);


userRoutes.post("/addSubject", authMiddleware, userAddSubjectCtrl);
userRoutes.post("/newSubject", authMiddleware, newSubjectCtrl);
userRoutes.post("/changeUserSubjectStatus", authMiddleware, userSubjectStatusCtrl);
userRoutes.get("/allSubject", authMiddleware, fetchSubjectCtrl);
userRoutes.post("/userSubject", authMiddleware, userSubjectCtrl);


module.exports = userRoutes;