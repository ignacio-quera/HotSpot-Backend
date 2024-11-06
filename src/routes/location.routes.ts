import { Router } from 'express'
export const locationRoutes = Router()
import {
    locationsGetController,
    locationGetController,
    locationPostController,
    locationDeleteController,
    locationPutController
 } from '../controllers/locationControllers'
import { verifyToken } from '../helpers/validate-token'

locationRoutes.get('/locations/', locationsGetController)
locationRoutes.get('/locations/:id', locationGetController)
locationRoutes.post('/locations/', verifyToken, locationPostController)
locationRoutes.delete('/locations/:id', verifyToken, locationDeleteController)
locationRoutes.put('/locations/:id', verifyToken, locationPutController)
