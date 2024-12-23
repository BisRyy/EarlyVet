from flask import request, jsonify
from model.ml_model import predict_disease

def configure_routes(app):
    @app.route('/api/predictions', methods=['POST'])
    def predict():
        try:
            if not request.is_json:
                return jsonify({'error': 'Invalid or missing JSON body'}), 400

            # Extract data from the request
            data = request.get_json()
            temperature = data.get('temperature')
            heart_rate = data.get('heartRate')
            respiration_rate = data.get('respirationRate')

            # Validate input
            if temperature is None or heart_rate is None or respiration_rate is None:
                return jsonify({'error': 'Missing required fields'}), 400
            
            if temperature < 0 or heart_rate < 0 or respiration_rate < 0:
                return jsonify({'error': 'Invalid input values'}), 400
            


            # Predict disease
            prediction = predict_disease(temperature, heart_rate, respiration_rate)

            # Return the prediction
            return jsonify({
                'message': 'Prediction successful',
                'prediction': prediction,
                'input': {
                    'temperature': temperature,
                    'heartRate': heart_rate,
                    'respirationRate': respiration_rate
                }
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
