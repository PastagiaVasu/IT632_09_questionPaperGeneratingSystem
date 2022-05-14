const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//create schema object

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profilePhoto: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png",
    },
    role: {
        required: [true, "Role is required"],
        type: Boolean,  // true -> admin | false -> faculty
    },
    firstName: {
        required: [true, "First name is required"],
        type: String,
    },
    lastName: {
        required: [true, "Last name is required"],
        type: String,
    },
    contact_number: {
        type: Number
    },
    status: {
        type: Boolean,
        // default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    // active: {
    //     type: Boolean,
    // },
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

//Hash password 
userSchema.pre('save', async function (next) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//match password 
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


//Compile the schema into models
const user = mongoose.model('User', userSchema);

module.exports = user;