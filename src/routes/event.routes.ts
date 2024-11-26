import { Router } from 'express'
export const eventRoutes = Router()
import {
    eventsGetController,
    eventGetController,
    eventPostController,
    eventDeleteController,
    eventPutController,
    eventSubscribeController,
    eventUnsubscribeController,
    eventLikeController,
    eventDislikeController,
    eventUnlikeController
 } from '../controllers/eventControllers'
import { verifyToken } from '../helpers/validate-token'

eventRoutes.get('/events/', eventsGetController)
eventRoutes.post('/events', verifyToken, eventPostController)
eventRoutes.get('/events/:id', eventGetController)
eventRoutes.delete('/events/:id', verifyToken, eventDeleteController)
eventRoutes.put('/events/:id', verifyToken, eventPutController)

// Subscribe and unsubscribe routes
eventRoutes.post('/events/subscribe', verifyToken, eventSubscribeController)
eventRoutes.post('/events/unsubscribe', verifyToken, eventUnsubscribeController)

// Likes routes
eventRoutes.post('/events/like', verifyToken, eventLikeController)
eventRoutes.post('/events/dislike', verifyToken, eventDislikeController)
eventRoutes.post('/events/unlike', verifyToken, eventUnlikeController)
