const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    datetime: { type: Date, required: true },
    anomalyType: { type: String, required: true }, // ex: "Surconsommation", "IsolationForest Anomaly"
    threshold: { type: Number },
    measuredValue: { type: Number, required: true },
    status: { type: String, default: 'Pending' } // "Pending", "Resolved"
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);