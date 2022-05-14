const mongoose = require('mongoose');

//create schema object
const subjectSchema = new mongoose.Schema({

    name: {
        required: [true, "Subject name is required"],
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
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
const subject = mongoose.model('subject', subjectSchema);

module.exports = subject;