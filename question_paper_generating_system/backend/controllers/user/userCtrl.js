const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/user");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


// // ----------------------------------------------------------------
// //  Register
// // ----------------------------------------------------------------

// const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
//     // check if user exist
//     const userExist = await User.findOne({ email: req?.body?.email });

//     if (userExist) {
//         res.status(401);
//         throw new Error('user already exists');
//     }
//     //console.log(req.body);
//     try {
//         //Register user
//         const user = await User.create({
//             //firstName: req.body && req.body.firstName,
//             firstName: req?.body?.firstName,
//             lastName: req?.body?.lastName,
//             email: req?.body?.email,
//             password: req?.body?.password,
//             contact_number: req?.body?.contact_number,
//             role: req?.body?.role,      // true for admin | false for faculty
//             status: req?.body?.status,  // true for admin | false for faculty
//         });
//         res.json(user);
//     } catch (error) {
//         res.json(error);
//     }
// });




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


        //create token with email
        let emailToken =  generateToken(user.email);

        let transporter = await nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            },
        });

        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Follow this link to activate account", // subjectSubject line
            html: "Hello, user. The link for your account verification is: " + `${process.env.SERVER}/api/user/verifyRegistration/${emailToken}`, //actual message
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else{
                //console.log(info);
                res.json(user);
                res.status(200).send({ message: "mail sent successfully" });
            }
        });

        //res.json(user);
    } catch (error) {
        res.json(error);
    }
});



// ----------------------------------------------------------------
//  Verify Registration by account status = true
// ----------------------------------------------------------------


const verifyRegistration = expressAsyncHandler(async (req, res) => {
    const emailToken = req.params.id;
    const decoded = jwt.verify(emailToken, process.env.JWT_KEY);
    //console.log("Decoded token in email is: "+decoded.id);
    const userExist = await User.findOne({ email: decoded.id });

    if (userExist) {
        try {
            const user = await User.findByIdAndUpdate(
                userExist._id, {
                isEmailVerified: true,
            },
                {
                    new: true,
                    runValidators: true
                }
            );

            // res.json(user);
            res.status(200).send("Account verified successfully... You can login now");
        } catch (error) {
            res.json(error);
        }
    }else{
        res.status(401);
        throw new Error("The link is expired or invalid");
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

        if(userFound?.isEmailVerified){
            let tokenLocal = generateToken(userFound?._id);
            //sessionStorage.setItem("token",tokenLocal);

            res.status(200).json({
                _id: userFound?._id,
                firstName: userFound?.firstName,
                lastName: userFound?.lastName,
                email: userFound?.email,
                profilePhoto: userFound?.profilePhoto,
                role: userFound?.role,
                token: tokenLocal,
            });
        }
        else{
            res.status(401);
            throw new Error('Please verify your email first.');     
        }  
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
    const userExist = await User.findOne({ _id: req?.body?.userId });

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
    verifyRegistration,
    // userProfileCtrl,
    // deleteFacultiesCtrl,
    // fetchFacultyDetailsCtrl,
    // facultyProfileCtrl,
    // updateFacultyCtrl,
};