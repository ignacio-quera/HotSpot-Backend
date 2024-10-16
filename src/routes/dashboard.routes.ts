import { Router } from 'express'
export const dashboadRoutes = Router()
import { dashboardGetController } from '../controllers/dashboardControllers'

dashboadRoutes.get('/dashboard', dashboardGetController)
