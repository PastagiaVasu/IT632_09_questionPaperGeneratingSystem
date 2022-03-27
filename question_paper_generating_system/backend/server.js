const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const facultyRoutes = require("././route/faculty/facultyRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");


dotenv.config();
const app = express();
//console.log(app);


//DB connection
dbConnect();
//console.log(process.env);

//Middleware
app.use(express.json());


//1. custom middleware
// const logger = (req,res,next) => {
//     console.log("Am a logger");
//     next();
// };

// //2. usage of Middleware
// app.use(logger);

//facultyRoutes
app.use("/api/faculties",facultyRoutes);

//errorHandler
//catch error beloe route
app.use(notFound);  // must put before errorHandler if using notFound
app.use(errorHandler);


// //Login
// app.post("/api/faculties/login",(req, res) => {
//     //business logic
//     res.json({faculty: "Faculty Login"});
// });


// //fetch all faculties
// app.get("/api/faculties",(req, res) => {
//     //business logic
//     res.json({faculty: "fetch all faculties"});
// });



//server
const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server is running on port ${PORT}`));

