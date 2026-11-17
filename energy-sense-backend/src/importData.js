const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { parquetRead } = require('hyparquet'); // Alternative légère ou lecture via pandas/json
const fs = require('fs');
const Consumption = require('./src/models/consumption.model');

dotenv.config();

// Comme lire du parquet en Node.js demande des dépendances lourdes, 
// la méthode la plus propre et rapide est d'exporter un échantillon JSON depuis Python, 
// ou d'utiliser un script Python pour insérer directement dans MongoDB.