const mongoose = require('mongoose');

//create schema object
const userSubjectSchema = new mongoose.Schema({

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