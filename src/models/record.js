const { Schema, model } = require('mongoose');

const recordSchema = new Schema({
    key: String,
    createdAt: Date,
    counts: [Number],
    value: String,
});

module.exports = model('Record', recordSchema);
