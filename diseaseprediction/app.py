from flask import Flask
from flask_cors import CORS
from routes.prediction_routes import configure_routes

app = Flask(__name__)
CORS(app)

# Configure routes
configure_routes(app)

if __name__ == '__main__':
    app.run(port=5003, debug=True)
