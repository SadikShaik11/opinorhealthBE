import mongoose from "mongoose";
/**
 * @author : Sadik shaik
 */
const hospitalSchema = new mongoose.Schema({
   
    address: {
        city: String,
        area: String,
        landmark: String,
        state: String,
        pincode: Number
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'hospital_admins',
        required: true
    },
    gstin: {
        type: String,
        required: true
    },
    hospitalRegistrationNo: {
        type: String,
        required: true
    },
    hospitalName: {
        type: String,
        required: true,
        trim: true
    },
    isChain: {
        type: Boolean,
        default: false
    },
    parentHospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hosptials",
    },
    branchCode: String,
    registrationNumber: {
        type: String,
        required: true
    },
    nabhId: {
        type: String,
        required: true
    },
   
    pan: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const hospitalModel = mongoose.model("hospital", hospitalSchema);

export { hospitalModel }
