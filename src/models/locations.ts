export { };
const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    coordinates: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    category: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: -1
    },
})

module.exports = mongoose.model('Location', locationSchema);