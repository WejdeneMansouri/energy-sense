const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    targetDate: { type: Date, required: true },
    predictedPower: { type: Number, required: true },
    modelUsed: { type: String, required: true }, // ex: "RandomForest", "XGBoost"
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);