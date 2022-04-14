const mongoose = require('mongoose');

//create schema object
const feedbackSchema = new mongoose.Schema({

    email: {
        required: [true, "Email is required"],
        type: String,
    },
    title: {
        required: [true, "Title is required"],
        type: String,
    },
    message: {
        required: [true, "Message is required"],
        type: String,
    },
},
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);


//Compile the schema into models
const feedback = mongoose.model('feedback', feedbackSchema);

module.exports = feedback;