import { Router } from 'express'
import catchAsync from '../../../config/catchAsync.js'
import { hospitalOnboardingController } from './hospital-onboarding.controller.js'

const router = Router()
/**
 * 
 * @ hospitalOnboarding 
 * @description : add a hospital
 * 
 */
router.post("/onboarding",
    (req, res) => catchAsync(hospitalOnboardingController.addHospital(req, res)))

router.post('/create-hospital-admin', (req, res) => catchAsync(hospitalOnboardingController.createHospitalAdmin(req, res)))


export default router