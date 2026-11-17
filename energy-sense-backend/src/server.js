const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Importer les routes
const consumptionRoutes = require('./routes/consumption.routes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Utilisation des routes
app.use('/api/consumptions', consumptionRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API EnergySense en marche 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});