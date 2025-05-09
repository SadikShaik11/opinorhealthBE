import mongoose from 'mongoose';
import { DOCTOR_CONSTANTS } from './DoctorSlots.constants.js';

const doctorSlotSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor_profiles',
        required: true
    },

    slots: [{
        day: {
            type: String,
            enum: DOCTOR_CONSTANTS.DOCTOR_SLOTS,
            required: true
        },
        slotTimings: [
            {
                startTime: {
                    type: String, // Format: 'HH:mm'
                    required: true
                },
                endTime: {
                    type: String, // Format: 'HH:mm'
                    required: true
                },
                isBooked: {
                    type: Boolean,
                    default: false
                },
                bookedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users',
                    default: null
                }
            }
        ]
    }]
}, {
    timestamps: true
});

const doctorSlotsModel = mongoose.model('doctor_slots', doctorSlotSchema);

export { doctorSlotsModel }
