const express = require('express');
const {
    facultyRegisterCtrl, 
    loginFacultyCtrl, 
    fetchFacultiesCtrl,
    deleteFacultiesCtrl,
    fetchFacultyDetailsCtrl,
    facultyProfileCtrl,
    updateFacultyCtrl,
    updateFacultyPasswordCtrl,
} = require("../../controllers/faculty/facultiesCtrl");
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const facultyRoutes = express.Router();

facultyRoutes.post("/register", facultyRegisterCtrl);
facultyRoutes.post("/login", loginFacultyCtrl);
facultyRoutes.get("/",authMiddleware,fetchFacultiesCtrl);
facultyRoutes.get("/profile/:id",authMiddleware,facultyProfileCtrl);
facultyRoutes.put("/updateFaculty",authMiddleware,updateFacultyCtrl);
facultyRoutes.put("/password",authMiddleware,updateFacultyPasswordCtrl);
facultyRoutes.delete("/:id",deleteFacultiesCtrl);
facultyRoutes.get("/:id",fetchFacultyDetailsCtrl);


module.exports = facultyRoutes;