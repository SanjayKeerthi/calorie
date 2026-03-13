const mongoose = require('mongoose');

const trackerDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    bmi: {
        type: Object,
        default: null
    },
    logs: {
        type: Map,
        of: Object,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('TrackerData', trackerDataSchema);
