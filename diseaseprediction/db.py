from pymongo import MongoClient
import os

# MongoDB connection setup
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/earlyvet')

client = MongoClient(MONGO_URI)
db = client['earlyvet']  # Database name

# Collections
predictions_collection = db['predictions']
