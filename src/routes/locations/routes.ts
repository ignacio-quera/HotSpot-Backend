export {};
const router = require('express').Router();

const {
    getAllLocations,
    getLocation,
    createLocation,
    deleteLocation,
    updateLocation
} = require('./cruds');

router.get('/', getAllLocations);
router.get('/:id', getLocation);
router.post('/', createLocation);
router.delete('/:id', deleteLocation);
router.put('/:id', updateLocation);

module.exports = router;
