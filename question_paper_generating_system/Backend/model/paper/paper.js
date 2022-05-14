const mongoose = require('mongoose');

//create schema object
const paperSchema = new mongoose.Schema({

    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    subject_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
    },
    exam_date: {
        required: [true, "Exam date is required"],
        type: Date,
    },
    marks: {
        required: [true, "Weightage is required"],
        type: Number,
    },
    type: {
        required: [true, "Type is required"],
        type: Boolean,
    },
    difficulty: {
        required: [true, "Difficulty level is required"],
        type: Number,
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
const paper = mongoose.model('paper', paperSchema);

module.exports = paper;