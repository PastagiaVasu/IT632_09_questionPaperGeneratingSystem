const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/user");
const Subject = require("../../model/subject/subject");
const userSubject = require("../../model/subject/user_subject");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");

//-----------------------------------------------------------
// new subject
//-----------------------------------------------------------

const newSubjectCtrl = expressAsyncHandler(async (req, res) => {

    // check if subject exist
    const subjectExist = await Subject.findOne({ name: req?.body?.name });

    if (subjectExist) {
        res.status(401);
        throw new Error('subject already exists');
    }

    console.log(req?.user?.id);
    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {
        console.log("........3");
        try {
            //Register user
            const sub = await Subject.create({
                name: req?.body?.name,
            });
            res.status(200).json(sub);
        } catch (error) {
            console.log("error....")
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

//-----------------------------------------------------------
// user subject
//-----------------------------------------------------------

const userAddSubjectCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    const sid = req?.body?.subject_id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });
    const subjectExist = await Subject.findOne({ _id: sid });

    const userSubjectExist = await userSubject.findOne({ user_id: id, subject_id: sid });

    if (userFound && userFound.status && !userFound.role) {

        if (!subjectExist) {
            res.status(401);
            throw new Error("Subject does not exist");
        }

        if (userSubjectExist) {

            try {
                const userSub = await userSubject.findByIdAndUpdate(
                    userSubjectExist._id, {
                    status: true
                });
                res.status(200).send(userSub);
            } catch (error) {
                res.json(error);
            }
        } else {

            try {
                const userSub = await userSubject.create({
                    user_id: id,
                    subject_id: sid
                });
                res.status(200).send(userSub);
            } catch (error) {
                res.json(error);
            }
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

//-----------------------------------------------------------
// deactivate userSubject
//-----------------------------------------------------------

const userSubjectStatusCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });
    const userSubExist = await userSubject.findOne({ user_id: id, subject_id: req?.body?.subject_id });

    if (userFound && userFound.status && !userFound.role) {

        try {
            const userSub = await userSubject.findByIdAndUpdate(
                userSubExist._id, {
                status: !userSubExist.status,
            },
                {
                    new: true,
                    runValidators: true
                }
            );

            // res.json(user);
            res.status(200).send("Status changed");
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
// fetch all subject 
//-----------------------------------------------------------

const fetchSubjectCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status) {

        try {
            const subs = await Subject.find({status:true});  // fetch all subjects
            res.status(200).json(subs);
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
// fetch all userSubject id
//-----------------------------------------------------------

const userSubjectCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && !userFound.role) {

        try {
            const userSubs = await userSubject.find({ user_id: id, status: true });  // fetch all userSubject
            res.status(200).json(userSubs);
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
// fetch subject by id
//-----------------------------------------------------------

const fetchSubjectByIdCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status) {

        try {
            const sub = await Subject.findOne({ _id: req?.body?.subject_id });  // fetch all userSubject
            res.status(200).json(sub);
        } catch (error) {
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

const adminDeleteSubject = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);
    // console.log(id)
    const userFound = await User.findOne({ _id: id });
    const subExist = await Subject.findOne({ _id: req?.body?.subject_id });
    // console.log(subExist)
    // console.log(userFound)
    if (userFound && userFound.status && userFound.role) {
        // console.log("inside if")
        try {
            const Sub = await Subject.findByIdAndUpdate(
                subExist._id, {
                status: !subExist.status,
            },
                {
                    new: true,
                    runValidators: true
                }
            );
            

            const userSubjectsUpdated = await userSubject.updateMany(
                {
                    subject_id : subExist._id, 
                    status: true
                }, 
                {
                    status: !subExist.status,
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            // res.json(user);
            res.status(200).send("Status changed for admin and all faculty");
        } catch (error) {
            res.status(401).json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});

module.exports = {
    userAddSubjectCtrl,
    newSubjectCtrl,
    userSubjectStatusCtrl,
    fetchSubjectCtrl,
    userSubjectCtrl,
    fetchSubjectByIdCtrl,
    adminDeleteSubject,
    // deleteFacultiesCtrl,
    // fetchFacultyDetailsCtrl,
    // facultyProfileCtrl,
    // updateFacultyCtrl,
};