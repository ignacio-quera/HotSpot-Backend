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

locationRoutes.get('/locations/', verifyToken, locationsGetController)
locationRoutes.get('/locations/:id', verifyToken, locationGetController)
locationRoutes.post('/locations/:id', verifyToken, locationPostController)
locationRoutes.delete('/locations/:id', verifyToken, locationDeleteController)
locationRoutes.put('/locations/:id', verifyToken, locationPutController)
