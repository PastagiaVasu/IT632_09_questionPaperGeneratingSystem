const mongoose = require('mongoose');

//create schema object
const paperSchema = new mongoose.Schema({

    user_id: {
        required: true,
        type: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
    },
    subject_id: {
        required: true,
        type: {
            type: Schema.Types.ObjectId,
            ref: 'subject'
        },
    },
    exam_date: {
        required: [true, "Exam date is required"],
        type: Date,
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