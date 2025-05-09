import { Router } from 'express'
import catchAsync from '../../config/catchAsync.js'
import { doctorProfileController } from './Doctors.controller.js'

const router = Router()

router.post('/doctor-onboarding', (req, res) => catchAsync(doctorProfileController.addDoctorProfile(req, res)))


router.put('/update-doctor-profile/:doctorId', (req, res) => catchAsync(doctorProfileController.updateDoctorProfile(req, res)))
router.put('/update-doctor-slots/:doctorId', (req, res) => catchAsync(doctorProfileController.updateDoctorSlots(req, res)))
router.get('/doctor-slots/:doctorId', (req, res) => catchAsync(doctorProfileController.getDoctorSlotsGroupedByDay(req, res)))
export default router;