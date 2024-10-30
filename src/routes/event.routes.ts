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

eventRoutes.get('/events/', verifyToken, eventsGetController)
eventRoutes.get('/events/:id', verifyToken, eventGetController)
eventRoutes.post('/events/:id', verifyToken, eventPostController)
eventRoutes.delete('/events/:id', verifyToken, eventDeleteController)
eventRoutes.put('/events/:id', verifyToken, eventPutController)
