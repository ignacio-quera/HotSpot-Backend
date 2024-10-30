export {};
const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
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
    coordinates: {
        type: [Number],
        default: [0, 0]
    },
    tags: {
        type: Array,
        required: false
    },
    score : {
        type: Number,
        default: -1
    },
})

module.exports = mongoose.model('Location', locationSchema);