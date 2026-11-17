const mongoose = require('mongoose');

const consumptionSchema = new mongoose.Schema({
    datetime: { type: Date, required: true, index: true },
    globalActivePower: { type: Number, required: true },
    globalReactivePower: { type: Number },
    voltage: { type: Number },
    globalIntensity: { type: Number },
    subMetering1: { type: Number }, // Cuisine
    subMetering2: { type: Number }, // Buanderie
    subMetering3: { type: Number }, // Chauffe-eau / Climatisation
}, { timestamps: true });

module.exports = mongoose.model('Consumption', consumptionSchema);