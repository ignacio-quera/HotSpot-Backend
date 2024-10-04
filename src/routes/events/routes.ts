export {};
const router = require('express').Router();
const {
    getAllEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent
} = require('./cruds');


router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/', createEvent);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);

module.exports = router;