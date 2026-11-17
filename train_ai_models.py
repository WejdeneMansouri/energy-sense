import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, IsolationForest
import xgboost as xgb
from pymongo import MongoClient

print("1. Connexion à MongoDB et chargement des données...")
client = MongoClient("mongodb://localhost:27017/")
db = client["energy_sense"]

df = pd.read_parquet("energy_cleaned.parquet")
df['hour'] = df.index.hour
df['dayofweek'] = df.index.day_of_week
df['month'] = df.index.month
df = df.dropna(subset=['Global_active_power'])

X = df[['hour', 'dayofweek', 'month']]
y = df['Global_active_power']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

print("2. Entraînement XGBoost pour les prévisions...")
xgb_model = xgb.XGBRegressor(n_estimators=50, learning_rate=0.1, random_state=42)
xgb_model.fit(X_train, y_train)
xgb_preds = xgb_model.predict(X_test)

# Sauvegarde d'un échantillon des prévisions dans MongoDB
print("3. Enregistrement des prévisions dans MongoDB...")
db["predictions"].drop() # Nettoyer l'ancienne collection
pred_records = []
for dt, pred, real in zip(X_test.index[:200], xgb_preds[:200], y_test[:200]):
    pred_records.append({
        "targetDate": dt,
        "predictedPower": float(pred),
        "actualPower": float(real),
        "modelUsed": "XGBoost"
    })
db["predictions"].insert_many(pred_records)

print("4. Détection d'anomalies (Isolation Forest)...")
iso_forest = IsolationForest(contamination=0.01, random_state=42)
df['anomaly'] = iso_forest.fit_predict(df[['Global_active_power']])

# Sauvegarde des alertes dans MongoDB
db["alerts"].drop()
anomalies_df = df[df['anomaly'] == -1].head(100) # Prendre un échantillon d'alertes
alert_records = []
for dt, row in anomalies_df.iterrows():
    alert_records.append({
        "datetime": dt,
        "anomalyType": "Surconsommation critique",
        "measuredValue": float(row['Global_active_power']),
        "threshold": 5.0,
        "status": "Pending"
    })
if alert_records:
    db["alerts"].insert_many(alert_records)

print("Succès ! Prévisions et alertes enregistrées dans MongoDB.")