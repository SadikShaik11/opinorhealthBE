import mongoose from "mongoose";

const STATUS = ['PENDING', 'APPROVED', 'REJECTED']
const CERTIFICATE_TYPES = ['ID_PROOF', 'MEDICAL_LICENSE', 'DEGREE_CERTIFICATE']
const doctorProfileSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: mongoose.Types.ObjectId, ref: 'documents' },
    address: {
        country: { type: String },
        state: { type: String },
        city: { type: String },
        street: { type: String },
        zipCode: { type: String },
    },
    education: [{
        degree: { type: String },
        university: { type: String },
        yearOfPassing: { type: Number },
        specialization: { type: String }
    }],
    certifications: [{
        name: { type: String },
        issuingOrganization: { type: String },
        issueDate: { type: Date },
        expiryDate: { type: Date },
        certificateFile: { type: mongoose.Types.ObjectId, ref: 'documents' }
    }],
    workExperience: [{
        hospitalName: { type: String },
        role: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        responsibilities: { type: String }
    }],
    department: { type: String },
    specialization: { type: String },
    medicalRegistrationNumber: { type: String },
    registrationCouncil: { type: String },
    yearsOfExperience: { type: Number },
    availability_days: {
        type: [String],
        enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    availability_timeSlots: [{
        from: { type: String },
        to: { type: String }
    }],
    documents: [{
        name: {
            type: String,
            enum: CERTIFICATE_TYPES
        },
        file: { type: mongoose.Types.ObjectId, ref: 'documents' },

    }],

    languagesSpoken: [String],
    bio: { type: String },
    achievements: [String],
    login_username: { type: String },
    status: {
        type: String,
        enum: STATUS,
        default: 'PENDING'
    },
    onboardedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' }
}, {
    timestamps: true,
});

const doctorsModel = mongoose.model('doctor_profile', doctorProfileSchema);
export { doctorsModel }
