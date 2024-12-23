import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

# Simulated training data
X_train = np.array([[38.5, 75, 18], [39.0, 80, 20], [40.0, 85, 22]])
y_train = ['healthy', 'sick', 'critical']

# Model setup
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
model = RandomForestClassifier()
model.fit(X_train_scaled, y_train)

def predict_disease(temperature, heart_rate, respiration_rate):
    input_data = np.array([[temperature, heart_rate, respiration_rate]])
    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)
    return prediction[0]
