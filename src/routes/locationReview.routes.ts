import { Router } from 'express'
export const locationReviewRoutes = Router()
import {
    locationReviewsGetController,
    locationReviewGetController,
    locationReviewPostController,
    locationReviewDeleteController,
    locationReviewPutController
 } from '../controllers/locationReviewControllers'
import { verifyToken } from '../helpers/validate-token'

locationReviewRoutes.get('/locationreviews/:locationId', locationReviewsGetController)
locationReviewRoutes.get('/locationreviews/:id', locationReviewGetController)
locationReviewRoutes.post('/locationreviews/:locationId', verifyToken, locationReviewPostController)
locationReviewRoutes.delete('/locationreviews/:id', verifyToken, locationReviewDeleteController)
locationReviewRoutes.put('/locationreviews/:id', verifyToken, locationReviewPutController)
