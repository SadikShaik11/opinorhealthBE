import mongoose from "mongoose";

/**
 * @author : Sadik shaik
 */
const ADMIN_TYPES = ['SUPER', 'NORMAL'];

const AdminSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ADMIN_TYPES,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'ACTIVE'
        }
    },
    { timestamps: true }
);

const adminModel = mongoose.model('admin', AdminSchema);

export { adminModel, ADMIN_TYPES };
