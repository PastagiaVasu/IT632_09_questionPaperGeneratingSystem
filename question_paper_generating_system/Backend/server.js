const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("././route/user/userRoute");
const paperRoutes = require("././route/paper/paperRoute");
const questionRoutes = require("././route/question/questionRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");

var cors = require("cors")

dotenv.config();
const app = express();
//console.log(app);
app.use(cors())
//DB connection
dbConnect();
//console.log(process.env);

//Middleware
app.use(express.json());

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

//1. custom middleware
// const logger = (req,res,next) => {
//     console.log("Am a logger");
//     next();
// };

// //2. usage of Middleware
// app.use(logger);

//userRoutes
app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/paper", paperRoutes);

//errorHandler
//catch error beloe route
app.use(notFound);  // must put before errorHandler if using notFound
app.use(errorHandler);

//test_questions
app.post("/test_questions", (req, res) => {
    //business logic
    res.json({ user: "user Login" });
});

// //Login
// app.post("/api/faculties/login",(req, res) => {
//     //business logic
//     res.json({user: "user Login"});
// });


// //fetch all faculties
// app.get("/api/faculties",(req, res) => {
//     //business logic
//     res.json({user: "fetch all faculties"});
// });




