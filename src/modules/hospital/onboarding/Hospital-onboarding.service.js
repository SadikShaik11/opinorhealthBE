

import Master from '../../../config/Master.class.js';
import Models from '../../../Models.js';
/**
 * 
 * @name : HospitalOnboardingService
 * 
 */

class HospitalOnboardingService extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }
    /**
     * 
     * @param {*} hospitalObj 
     * @returns creates hospital data on successful response
     */
    async addHospital(hospitalObj) {
        try {
            this.logger.info("HospitalService: Inside addHospital Method");
            const hospital = await Models.HOSPITAL_MODEL.findOne({ pan: hospitalObj.pan })
            if (hospital && (!hospitalObj.branchCode || hospitalObj.branchCode == '')) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Hospital already  , please enter branch code !')
            }
            if (hospitalObj.hospitalChain) {
                if (!parentHospitalId || parentHospitalId == "") {
                    throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'parentHospitalId is mandatory for hospital chain !')
                }
                const checkParentHospital = await await Models.HOSPITAL_MODEL.findOne({ parentHospitalId: hospitalObj.parentHospitalId })
                if (!checkParentHospital._id) {
                    throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'no hospital exist with given parentHospitalId . please contact admin !')
                }
            }
            const res = await Models.HOSPITAL_MODEL.create(hospitalObj)
            console.log(res)
            return { success: true, data: res }
        } catch (error) {
            console.log(error)
            this.logError("HospitalService: Error in addHospital", error);
            throw error
        }
    }

    async addHospitalAdmin(hospitalAdminObj) {
        try {
            this.logger.info("HospitalService: Inside addHospitalAdmin Method");
            const getHospitalAdminDetails = await Models.HOSPITAL_ADMIN.findOne({ contact: `${hospitalAdminObj.contact}` })
            if (getHospitalAdminDetails && getHospitalAdminDetails.contact) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Admin already exists with the given details !')
            }
            const uId = this.generateUniqueId()
            hospitalAdminObj.adminId = uId
            const result = await await Models.HOSPITAL_ADMIN.create(hospitalAdminObj)
            return { success: true, data: result }
        } catch (error) {
            this.logError("HospitalService: Error in addHospital", error);
            throw error
        }
    }

    async getHospital(hospitalId) {
        try {
            this.logger.info("HospitalService: Inside getHospital Method");
            const hospital = await Models.HOSPITAL_MODEL.findById(hospitalId)
            if (!hospital) {
                throw this.API_ERROR(this.HTTP_STATUS.NOT_FOUND, 'Hospital not found!')
            }
            return hospital
        } catch (error) {
            this.logError("HospitalService: Error in getHospital", error);
            throw error
        }
    }

    async updateHospital(hospitalId, updateData) {
        try {
            this.logger.info("HospitalService: Inside updateHospital Method");
            const hospital = await Models.HOSPITAL_MODEL.findByIdAndUpdate(hospitalId, updateData, { new: true })
            if (!hospital) {
                throw this.API_ERROR(this.HTTP_STATUS.NOT_FOUND, 'Hospital not found!')
            }
            return hospital
        } catch (error) {
            this.logError("HospitalService: Error in updateHospital", error);
            throw error
        }
    }

    async deleteHospital(hospitalId) {
        try {
            this.logger.info("HospitalService: Inside deleteHospital Method");
            const hospital = await Models.HOSPITAL_MODEL.findByIdAndDelete(hospitalId)
            if (!hospital) {
                throw this.API_ERROR(this.HTTP_STATUS.NOT_FOUND, 'Hospital not found!')
            }
            return { message: 'Hospital deleted successfully' }
        } catch (error) {
            this.logError("HospitalService: Error in deleteHospital", error);
            throw error
        }
    }
}

export const hospitalOnboardingService = new HospitalOnboardingService()