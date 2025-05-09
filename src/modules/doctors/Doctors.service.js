import Master from '../../config/Master.class.js';
import Models from '../../Models.js';
import { DOCTOR_CONSTANTS } from './slots/DoctorSlots.constants.js';

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

    /**
    * 
    * @param {*} doctorId 
    * @param {*} slotsData 
    * @returns updates doctor slots
    */

    async updateDoctorSlots(doctorId, updateData) {
        try {
            if (!Array.isArray(updateData.slots) || updateData.slots.length === 0) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'slots array is required');
            }

            let doctorSlots = await Models.DOCTOR_SLOTS.findOne({ doctorId });

            if (!doctorSlots) {
                doctorSlots = await Models.DOCTOR_SLOTS.create({
                    doctorId,
                    slots: [],
                });
            }

            const toMinutes = (str) => {
                const [h, m] = str.split(':').map(Number);
                return h * 60 + m;
            };

            for (const daySlot of updateData.slots) {
                const { day, slotTimings } = daySlot;

                if (!day || !Array.isArray(slotTimings) || slotTimings.length === 0) {
                    throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Each slot must have a valid day and slotTimings');
                }

                if (!DOCTOR_CONSTANTS.DOCTOR_SLOTS.includes(day)) {
                    throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, `Invalid day: ${day}`);
                }

                const seenSlots = new Set();

                for (let i = 0; i < slotTimings.length; i++) {
                    const { startTime, endTime } = slotTimings[i];

                    if (!startTime || !endTime) {
                        throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Each slotTiming must have startTime and endTime');
                    }

                    const start = toMinutes(startTime);
                    const end = toMinutes(endTime);

                    if (end - start !== 30) {
                        throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, `Slot ${startTime}-${endTime} must be exactly 30 minutes`);
                    }

                    if (i > 0) {
                        const prevEnd = toMinutes(slotTimings[i - 1].endTime);
                        if (start !== prevEnd + 1) {
                            throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, `Slot at ${startTime} must start 1 minute after previous slot ends`);
                        }
                    }

                    const key = `${startTime}-${endTime}`;
                    if (seenSlots.has(key)) {
                        throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, `Duplicate slot: ${key}`);
                    }
                    seenSlots.add(key);

                    slotTimings[i].isBooked = false;
                    slotTimings[i].bookedBy = null;
                }

                const existing = doctorSlots.slots.find((s) => s.day === day);
                if (existing) {
                    existing.slotTimings = slotTimings;
                } else {
                    doctorSlots.slots.push({ day, slotTimings });
                }
            }

            await doctorSlots.save();
            return { success: true, data: doctorSlots };

        } catch (err) {
            console.error('DoctorProfileService: Error in updateDoctorSlots', err);
            throw this.API_ERROR(this.HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message || 'Internal Server Error');
        }
    }

    /**
   * 
   * @param {*} doctorId  
   * @returns gets all doctor slots
   */


    async getDoctorSlotsGroupedByDay(doctorId) {
        try {
            if (!doctorId) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'doctorId is required');
            }

            const doctorSlots = await Models.DOCTOR_SLOTS.findOne({ doctorId });

            if (!doctorSlots) {
                throw this.API_ERROR(this.HTTP_STATUS.NOT_FOUND, 'No slots found for this doctor');
            }

            const groupedSlots = {};

            for (const daySlot of doctorSlots.slots) {
                groupedSlots[daySlot.day] = daySlot.slotTimings.map(timing => ({
                    startTime: timing.startTime,
                    endTime: timing.endTime,
                    isBooked: timing.isBooked,
                    bookedBy: timing.bookedBy
                }));
            }

            return {
                success: true,
                data: {
                    doctorId,
                    slots: groupedSlots
                }
            };

        } catch (err) {
            console.error('DoctorProfileService: Error in getDoctorSlotsGroupedByDay', err);
            throw this.API_ERROR(this.HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message || 'Internal Server Error');
        }
    }



}

export const doctorProfileService = new DoctorProfileService();
