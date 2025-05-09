import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    type: {
        type: String,
        enum: ['DOCTOR', 'USER', 'ADMIN', 'LAB_ASSISTANT'],
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE',
        required: true
    }
});




const userModel = mongoose.model('users', userSchema);

export {
    userModel,
};
