const { Schema, model } = require('mongoose');

const LogSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
    },
    action: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = model('logs', LogSchema);
