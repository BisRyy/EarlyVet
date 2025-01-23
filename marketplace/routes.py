from flask import Blueprint, request, jsonify
from models import Listing, db

marketplace_blueprint = Blueprint('marketplace', __name__)

@marketplace_blueprint.route('/listings', methods=['GET'])
def get_listings():
    listings = Listing.query.all()
    return jsonify([listing.to_dict() for listing in listings]), 200

@marketplace_blueprint.route('/listings', methods=['POST'])
def add_listing():
    data = request.json
    if 'title' not in data or 'price' not in data:
        return jsonify({"error": "Title and price are required"}), 400
    new_listing = Listing(
        title=data['title'],
        description=data.get('description', ''),
        price=data['price'],
        category=data.get('category', '')
    )
    db.session.add(new_listing)
    db.session.commit()
    return jsonify({"message": "Listing added successfully", "listing": new_listing.to_dict()}), 201
