import Master from '../../config/Master.class.js';

import ApiError from '../../config/APIError.js';

import { doctorProfileService } from './Doctors.service.js';
/**
 * @name : DoctorProfileController
 */
class DoctorProfileController extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    /**
     * @description: to create a new doctor profile
     * @param {*} req 
     * @param {*} res 
     */
    async addDoctorProfile(req, res) {
        try {
            this.logger.info("DoctorProfileController: Inside addDoctorProfile controller");
            const response = await doctorProfileService.addDoctorProfile(req.body);
            res.status(this.HTTP_STATUS.CREATED).json(response);
        } catch (error) {
            this.logError("Error adding doctor profile:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    /**
     * @description: to update a doctor profile
     * @param {*} req 
     * @param {*} res 
     */
    async updateDoctorProfile(req, res) {
        try {
            this.logger.info("DoctorProfileController: Inside updateDoctorProfile controller");
            const { doctorId } = req.params;
            const response = await doctorProfileService.updateDoctorProfile(doctorId, req.body);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {
            this.logError("Error updating doctor profile:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }
}

export const doctorProfileController = new DoctorProfileController();
