import Master from '../../config/Master.class.js';
import Models from '../../Models.js';

/**
 * 
 * @name : DoctorProfileService
 * 
 */
class DoctorProfileService extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    /**
     * 
     * @param {*} doctorObj 
     * @returns creates doctor profile data on successful response
     */
    async addDoctorProfile(doctorObj) {
        try {
            this.logger.info("DoctorProfileService: Inside addDoctorProfile Method");

            // Optional: Check if doctor already exists by email or phone
            const existingDoctor = await Models.DOCTOR_PROFILE_MODEL.findOne({
                $or: [
                    { email: doctorObj.email },
                    { phoneNumber: doctorObj.phoneNumber }
                ]
            });

            if (existingDoctor) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Doctor already exists with given phone or email!');
            }

            const doctorProfile = await Models.DOCTOR_PROFILE_MODEL.create(doctorObj);
            return { success: true, data: doctorProfile };
        } catch (error) {
            console.log(error)
            this.logError("DoctorProfileService: Error in addDoctorProfile", error);
            throw error;
        }
    }

    /**
     * 
     * @param {*} doctorId 
     * @param {*} updateData 
     * @returns updates doctor profile by ID
     */
    async updateDoctorProfile(doctorId, updateData) {
        try {
            console.log("==>", doctorId)
            this.logger.info("DoctorProfileService: Inside updateDoctorProfile Method");

            const updatedDoctor = await Models.DOCTOR_PROFILE_MODEL.findByIdAndUpdate(
                { _id: doctorId },
                updateData,
                { new: true }
            );

            if (!updatedDoctor) {
                throw this.API_ERROR(this.HTTP_STATUS.NOT_FOUND, 'Doctor profile not found!');
            }

            return { success: true, data: updatedDoctor };
        } catch (error) {
            console.log(error)
            this.logError("DoctorProfileService: Error in updateDoctorProfile", error);
            throw error;
        }
    }
}

export const doctorProfileService = new DoctorProfileService();
