const mongoose = require('mongoose');

//create schema object
const userSubjectSchema = new mongoose.Schema({

    user_id: {
        required: [true, "user_id is required"],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    subject_id: {
        required: [true, "subject_id is required"],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
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
const user_subject = mongoose.model('user_subject', userSubjectSchema);

module.exports = user_subject;