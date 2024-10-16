import { Router } from 'express'
export const dashboadRoutes = Router()
import { dashboardGetController } from '../controllers/dashboardControllers'
import { verifyToken } from '../helpers/validate-token'

dashboadRoutes.get('/dashboard', verifyToken, dashboardGetController)
