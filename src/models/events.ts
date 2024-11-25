export { };
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    points: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Event', eventSchema);