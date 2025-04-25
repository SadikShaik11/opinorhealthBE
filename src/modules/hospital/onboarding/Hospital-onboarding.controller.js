import Master from '../../../config/Master.class.js';
import { hospitalOnboardingService } from './Hospital-onboarding.service.js';
import ApiError from '../../../config/APIError.js';

class HospitalOnboardingController extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    async addHospital(req, res) {
        try {
            this.logger.info("HospitalController: Inside addHospital controller");
            const response = await hospitalOnboardingService.addHospital(req.body);
            res.status(this.HTTP_STATUS.CREATED).json(response);
        } catch (error) {
            this.logError("Error adding hospital:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    /**
     * @description: to create hospital admin
     * @param {*} req 
     * @param {*} res 
     */

    async createHospitalAdmin(req, res) {
        try {
            this.logger.info("HospitalController: Inside createHospitalAdmin controller");
            const response = await hospitalOnboardingService.addHospitalAdmin(req.body)
            res.status(this.HTTP_STATUS.CREATED).json(response);
        } catch (error) {
            this.logError("Error adding hospital:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    async getHospital(req, res) {
        try {
            this.logger.info("HospitalController: Inside getHospital controller");
            const { hospitalId } = req.params;
            const response = await hospitalOnboardingService.getHospital(hospitalId);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {
            this.logError("Error retrieving hospital:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    async updateHospital(req, res) {
        try {
            this.logger.info("HospitalController: Inside updateHospital controller");
            const { hospitalId } = req.params;
            const response = await hospitalOnboardingService.updateHospital(hospitalId, req.body);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {
            this.logError("Error updating hospital:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    async deleteHospital(req, res) {
        try {
            this.logger.info("HospitalController: Inside deleteHospital controller");
            const { hospitalId } = req.params;
            const response = await hospitalOnboardingService.deleteHospital(hospitalId);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {
            this.logError("Error deleting hospital:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }
}

export const hospitalOnboardingController = new HospitalOnboardingController();
