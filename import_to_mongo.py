import pandas as pd
from pymongo import MongoClient

print("Connexion à MongoDB...")
client = MongoClient("mongodb://localhost:27017/")
db = client["energy_sense"]
collection = db["consumptions"]

print("Lecture du fichier Parquet nettoyé...")
df = pd.read_parquet("energy_cleaned.parquet")

# Pour un test rapide et éviter de saturer la mémoire d'un coup, 
# on peut prendre un échantillon ou tout insérer par lots (batch).
# Ici, on prend par exemple les 50 000 premières lignes pour structurer la base, 
# ou tout le dataset si ton PC a assez de mémoire.
df_sample = df.head(50000).reset_index()

# Renommer les colonnes pour correspondre à notre modèle Mongoose
df_sample.rename(columns={
    'Datetime': 'datetime',
    'Global_active_power': 'globalActivePower',
    'Global_reactive_power': 'globalReactivePower',
    'Voltage': 'voltage',
    'Global_intensity': 'globalIntensity',
    'Sub_metering_1': 'subMetering1',
    'Sub_metering_2': 'subMetering2',
    'Sub_metering_3': 'subMetering3'
}, inplace=True)

print("Conversion des données en dictionnaires...")
data_dicts = df_sample.to_dict(orient="records")

print("Insertion des données dans MongoDB...")
collection.insert_many(data_dicts)

print(f"Succès ! {len(data_dicts)} documents ont été insérés dans la base MongoDB 'energy_sense'.")