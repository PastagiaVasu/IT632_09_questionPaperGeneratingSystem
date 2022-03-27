const expressAsyncHandler = require("express-async-handler");
const Faculty = require("../../model/faculty/faculty");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");


// ----------------------------------------------------------------
//Register
//----------------------------------------------------------------

const facultyRegisterCtrl = expressAsyncHandler( async (req, res) => {
        // check if faculty exist
        const facultyExist = await Faculty.findOne({email: req?.body?.email});
    
        if(facultyExist) throw new Error('Faculty already exists');
        //console.log(req.body);
        try {
            //Register faculty
        const faculty = await Faculty.create({
            //firstName: req.body && req.body.firstName,
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password: req?.body?.password,
        });
        res.json(faculty);
        } catch (error) {
            res.json(error);    
        }
    
    }   
);

//----------------------------------------------------------------
//Login Faculty
//----------------------------------------------------------------
const loginFacultyCtrl = expressAsyncHandler(async (req,res) => {
    const {email,password} = req.body;
    //check if faculty exists
    const facultyFound = await Faculty.findOne({email});
    
    //check if paassword s matched
    if(facultyFound && await facultyFound.isPasswordMatched(password)){
        res.json({
            _id: facultyFound?._id,
            firstName: facultyFound?.firstName,
            lastName: facultyFound?.lastName,
            email: facultyFound?.email,
            profilePhoto: facultyFound?.profilePhoto,
            isAdmin: facultyFound?.isAdmin,
            token: generateToken(facultyFound?._id),
        });
    }
    else{
        res.status(401);
        throw new Error("Invaild login credentials");
    }

});

//-----------------------------------------------------------
// fetch all Facultys
//-----------------------------------------------------------

const fetchFacultiesCtrl = expressAsyncHandler(async (req,res)=>{
    console.log(req.headers);
    try {
        const facultys = await Faculty.find({});
        res.json(facultys);
    } catch (error) {
        res.json(error);
    }
});

//-----------------------------------------------------------
// delete faculty
//----------------------------------------------------------------

const deleteFacultiesCtrl = expressAsyncHandler( async (req, res) => {
    console.log(req.params);
    const {id} = req.params;

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
//----------------------------------------------------------------

const fetchFacultyDetailsCtrl = expressAsyncHandler( async (req, res) => {
    const {id} = req.params;

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
//----------------------------------------------------------------

const facultyProfileCtrl = expressAsyncHandler( async (req, res) => {
    const {id} = req.params;
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
//----------------------------------------------------------------

const updateFacultyCtrl = expressAsyncHandler( async (req, res) => {
    const { _id } = req?.faculty;
    validateMongodbID(_id);
    
    const faculty = await Faculty.findByIdAndUpdate(
        _id,{
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



module.exports = {
    facultyRegisterCtrl, 
    loginFacultyCtrl, 
    fetchFacultiesCtrl,
    deleteFacultiesCtrl,
    fetchFacultyDetailsCtrl,
    facultyProfileCtrl,
    updateFacultyCtrl,
    };