export {};
const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: Array,
        required: false
    },
    coordinates: {
        type: [Number],
        default: [0, 0]
    }
})

module.exports = mongoose.model('Event', eventSchema);
