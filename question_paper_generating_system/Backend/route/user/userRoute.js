const express = require('express');
const {
    userRegisterCtrl,
    loginCtrl,
    fetchUserCtrl,
    userStatusCtrl,
    userQuestionCtrl,
    verifyRegistration,
    fetchVerifiedUserCtrl,
    userProfileCtrl,
    userEditProfileCtrl,
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
    fetchSubjectByIdCtrl,
    adminDeleteSubject,
} = require("../../controllers/subject/subjectCtrl");

const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginCtrl);
userRoutes.get("/allFaculties", authMiddleware, fetchUserCtrl);
userRoutes.get("/allQuestions", authMiddleware, userQuestionCtrl);
userRoutes.post("/changeStatus/:id", authMiddleware, userStatusCtrl);
userRoutes.get("/allVerifiedFaculties", authMiddleware, fetchVerifiedUserCtrl);

// userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
// userRoutes.put("/:id", authMiddleware, updateUserCtrl);
// userRoutes.delete("/:id", deleteUserCtrl);
// userRoutes.get("/:id", fetchUserDetailsCtrl);

userRoutes.get("/verifyRegistration/:id", verifyRegistration);
userRoutes.post("/newFeedback", authMiddleware, newFeedbackCtrl);
userRoutes.get("/allFeedback", authMiddleware, fetchFeedbackCtrl);


userRoutes.post("/addSubject", authMiddleware, userAddSubjectCtrl);
userRoutes.post("/newSubject", authMiddleware, newSubjectCtrl);
userRoutes.post("/changeUserSubjectStatus", authMiddleware, userSubjectStatusCtrl);
userRoutes.get("/allSubject", authMiddleware, fetchSubjectCtrl);
userRoutes.get("/userSubject", authMiddleware, userSubjectCtrl);
userRoutes.get("/fetchSubject", authMiddleware, fetchSubjectByIdCtrl);
userRoutes.post("/chanageSubjectStatus", authMiddleware, adminDeleteSubject);
userRoutes.get("/getProfile", authMiddleware, userProfileCtrl);
userRoutes.post("/editProfile", authMiddleware, userEditProfileCtrl);

module.exports = userRoutes;