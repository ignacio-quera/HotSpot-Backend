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
locationReviewRoutes.get('/locationreview/:id', locationReviewGetController)
locationReviewRoutes.post('/locationreview/:locationId', verifyToken, locationReviewPostController)
locationReviewRoutes.delete('/locationreview/:id', verifyToken, locationReviewDeleteController)
locationReviewRoutes.put('/locationreview/:id', verifyToken, locationReviewPutController)
