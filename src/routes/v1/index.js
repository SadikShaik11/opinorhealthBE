import Router from 'express'
import UserRoutes from '../../modules/users/Users.routes.js'
import HospitalRoutes from '../../modules/hospital/onboarding/Hospital-onboarding.routes.js'
import DocumentRoutes from '../../modules/documents/Documents.routes.js'
import doctorRoutes from '../../modules/doctors/Doctors.routes.js'
const router = Router()

/**
 * @ to login signup
 */
router.use('/hospital', HospitalRoutes)
router.use('/user', UserRoutes)
router.use('/documents', DocumentRoutes)
router.use('/doctor', doctorRoutes)

// router.get('/api', (req, res) => res.send('Default route'))


export default router