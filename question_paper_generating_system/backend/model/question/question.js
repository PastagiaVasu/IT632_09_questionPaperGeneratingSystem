const mongoose = require('mongoose');

//create schema object
const questionSchema = new mongoose.Schema({

    user_subject_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_subject',
    },
    question: {
        required: [true, "Question is required"],
        type: String,
    },
    type: {
        required: [true, "Type is required"],
        type: Boolean,
    },
    mark: {
        required: [true, "Mark is required"],
        type: Number,
    },
    diffculty: {
        required: [true, "Diffculty level is required"],
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
const question = mongoose.model('Question', questionSchema);

module.exports = question;