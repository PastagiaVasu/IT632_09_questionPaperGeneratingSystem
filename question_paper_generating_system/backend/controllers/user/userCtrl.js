const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/user");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");


// ----------------------------------------------------------------
//  Register
// ----------------------------------------------------------------

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
    // check if user exist
    const userExist = await User.findOne({ email: req?.body?.email });

    if (userExist) {
        res.status(401);
        throw new Error('user already exists');
    }
    //console.log(req.body);
    try {
        //Register user
        const user = await User.create({
            //firstName: req.body && req.body.firstName,
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password,
            contact_number: req?.body?.contact_number,
            role: req?.body?.role,      // true for admin | false for faculty
            status: req?.body?.status,  // true for admin | false for faculty
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

/**/
//----------------------------------------------------------------
// Login
//----------------------------------------------------------------
const loginCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const userFound = await User.findOne({ email: email });

    //check if paassword s matched
    if (userFound && userFound.status && await userFound.isPasswordMatched(password)) {
        res.status(200).json({
            _id: userFound?._id,
            firstName: userFound?.firstName,
            lastName: userFound?.lastName,
            email: userFound?.email,
            profilePhoto: userFound?.profilePhoto,
            role: userFound?.role,
            token: generateToken(userFound?._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Invaild email or password");
    }

});

/**/
//-----------------------------------------------------------
// fetch all user = faculties
//-----------------------------------------------------------

const fetchUserCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });

    if (userFound && userFound.status && userFound.role) {

        try {
            const user = await User.find({ role: false });  // fetch all faculties
            res.status(200).json(user);
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
// deactivate user
//-----------------------------------------------------------

const userStatusCtrl = expressAsyncHandler(async (req, res) => {

    const id = req?.user.id;
    validateMongodbID(id);

    const userFound = await User.findOne({ _id: id });
    const userExist = await User.findOne({ _id: req?.body?.user_id });

    if (userFound && userFound.status && userFound.role) {

        try {
            const user = await User.findByIdAndUpdate(
                userExist._id, {
                status: !userExist.status,
            },
                {
                    new: true,
                    runValidators: true
                }
            );

            // res.json(user);
            res.status(200).send("Status changed");
        } catch (error) {
            res.json(error);
        }
    }
    else {
        res.status(401);
        throw new Error("Your account blocked");
    }
});


/*
//-----------------------------------------------------------
// delete faculty
//-----------------------------------------------------------

const deleteFacultiesCtrl = expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    //check if faculty id is valid
    validateMongodbID(id);

    try {
        const deletedFaculty = await Faculty.findByIdAndDelete(id);
        res.json(deletedFaculty);
    } catch (error) {
        res.json(error);
    }
    res.send("Delete faculty controller");
});


//-----------------------------------------------------------
// faculty details
//-----------------------------------------------------------

const fetchFacultyDetailsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    //check if faculty id is valid
    validateMongodbID(id);

    try {
        const faculty = await Faculty.findById(id);
        res.json(faculty);
    } catch (error) {
        res.json(error);
    }
});

//-----------------------------------------------------------
// faculty profile
//-----------------------------------------------------------

const facultyProfileCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
        const myProfile = await Faculty.findById(id);
        res.json(myProfile);
    } catch (error) {
        res.json(error);
    }
});

//-----------------------------------------------------------
// update profile
//-----------------------------------------------------------

const updateFacultyCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.faculty;
    validateMongodbID(_id);

    const faculty = await Faculty.findByIdAndUpdate(
        _id, {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
    },
        {
            new: true,
            runValidators: true
        }
    );
    console.log(_id);
    res.json(faculty);

});
*/
module.exports = {
    userRegisterCtrl,
    loginCtrl,
    fetchUserCtrl,
    userStatusCtrl,
    // userProfileCtrl,
    // deleteFacultiesCtrl,
    // fetchFacultyDetailsCtrl,
    // facultyProfileCtrl,
    // updateFacultyCtrl,
};