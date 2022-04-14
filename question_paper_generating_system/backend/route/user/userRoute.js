const express = require('express');
const {
    userRegisterCtrl,
    loginCtrl,
    fetchUserCtrl,
    // deleteUserCtrl,
    // fetchUserDetailsCtrl,
    // userProfileCtrl,
    // updateUserCtrl,
} = require("../../controllers/user/userCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginCtrl);
userRoutes.get("/allFaculties", authMiddleware, fetchUserCtrl);
// userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
// userRoutes.put("/:id", authMiddleware, updateUserCtrl);
// userRoutes.delete("/:id", deleteUserCtrl);
// userRoutes.get("/:id", fetchUserDetailsCtrl);


module.exports = userRoutes;