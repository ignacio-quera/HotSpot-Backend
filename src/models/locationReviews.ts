export { };
const mongoose = require('mongoose');

const locationReviewSchema = mongoose.Schema({
    title: {
        type: String,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        min: 6,
        max: 1024
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Location',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    criteria: 
        [{
            type: String,
        }]
    ,
    userId: {
        type: String,
        required: true,
    },
    
})

module.exports = mongoose.model('LocationReview', locationReviewSchema);