import { Router } from 'express'
export const eventRoutes = Router()
import {
    eventsGetController,
    eventGetController,
    eventPostController,
    eventDeleteController,
    eventPutController
 } from '../controllers/eventControllers'
import { verifyToken } from '../helpers/validate-token'

eventRoutes.get('/events/', eventsGetController)
eventRoutes.post('/events', verifyToken, eventPostController)
eventRoutes.get('/events/:id', eventGetController)
eventRoutes.delete('/events/:id', verifyToken, eventDeleteController)
eventRoutes.put('/events/:id', verifyToken, eventPutController)
