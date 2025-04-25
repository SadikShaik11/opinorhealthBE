import { Router } from 'express'
import catchAsync from "../../config/catchAsync.js"
import { documentController } from './Documents.controller.js'


const router = Router()

router.post('/upload-image',
    (req, res) => catchAsync(documentController.uploadImage(req, res)))
export default router