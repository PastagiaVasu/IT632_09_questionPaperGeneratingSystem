const mongoose = require('mongoose');

//create schema object
const answerSchema = new mongoose.Schema({

    question_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
    },
    answer: {
        required: [true, "Answer is required"],
        type: String,
    },
    right: {
        required: [true, "Right is required"],
        type: Boolean,
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
const answer = mongoose.model('answer', answerSchema);

module.exports = answer;