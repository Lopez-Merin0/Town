const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    minigame1Progress: {
        type: Object,
        default: null
    },
    minigame2Progress: {
        type: Object,
        default: null
    },
    minigame3Progress: {
        type: Object,
        default: null
    },
    lastSaved: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);
