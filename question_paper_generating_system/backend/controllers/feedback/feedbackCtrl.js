const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/user");
const Feedback = require("../../model/feedback/feedback");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");


// ----------------------------------------------------------------
//  new feedback
// ----------------------------------------------------------------

const newFeedbackCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && !userFound.role) {
        try {
            //Register user
            const feedback = await Feedback.create({
                email: req?.body?.email,
                title: req?.body?.title,
                message: req?.body?.message,
            });
            res.status(200).json(feedback);
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
// fetch all feedback
//-----------------------------------------------------------

const fetchFeedbackCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {
        try {
            const feedback = await Feedback.find();  // fetch all feedbacks
            res.json(feedback);
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
    newFeedbackCtrl,
    fetchFeedbackCtrl,
};