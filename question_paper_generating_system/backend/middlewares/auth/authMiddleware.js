const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const Faculty = require("../../model/faculty/Faculty");

const authMiddleware = expressAsyncHandler(async (req,res,next)=> {
    let token;

    if(req?.headers?.authorization?.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1];
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEY);

                //find the faculty by id
                const faculty = await Faculty.findById(decoded?.id).select("-password");

                //attach the faculty to the request object
                req.faculty = faculty;
                next();
            }
        } catch (error) {
            throw new Error("Not authorized token expired, login again");
        }
    }
    else{
        throw new Error("There is no token attached to header");
    }
});


module.exports = authMiddleware;