const mongoose = require('mongoose');

//create schema object
const paperDetailSchema = new mongoose.Schema({

    paper_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paper',
    },
    question_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
    },
    answer_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answer',
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
const paper_detail = mongoose.model('paper_detail', paperDetailSchema);

module.exports = paper_detail;