const Consumption = require('../models/consumption.model');

// Récupérer un extrait des consommations pour les graphiques
getConsumptions = async (req, res) => {
    try {
        // On récupère par exemple les 500 premières mesures pour l'affichage initial
        const data = await Consumption.find().sort({ datetime: 1 }).limit(500);
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getConsumptions };