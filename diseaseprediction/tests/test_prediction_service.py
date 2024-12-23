import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_predict_success(client):
    """Test disease prediction with valid input."""
    response = client.post('/api/predictions', json={
        'temperature': 39.5,
        'heartRate': 78,
        'respirationRate': 22
    })
    data = response.get_json()

    assert response.status_code == 200
    assert data['message'] == 'Prediction successful'
    assert 'prediction' in data
    assert data['input']['temperature'] == 39.5
    assert data['input']['heartRate'] == 78
    assert data['input']['respirationRate'] == 22

def test_missing_fields(client):
    """Test prediction endpoint with missing fields."""
    response = client.post('/api/predictions', json={
        'temperature': 39.5,
        'heartRate': 78
    })
    data = response.get_json()

    assert response.status_code == 400
    assert data['error'] == 'Missing required fields'

def test_invalid_data(client):
    """Test prediction endpoint with invalid data."""
    response = client.post('/api/predictions', json={
        'temperature': 'high',  # Invalid string instead of number
        'heartRate': 78,
        'respirationRate': 22
    })
    data = response.get_json()

    assert response.status_code == 500
    assert 'error' in data

def test_negative_values(client):
    """Test prediction endpoint with negative input values."""
    response = client.post('/api/predictions', json={
        'temperature': -10,  # Invalid negative temperature
        'heartRate': -78,    # Invalid negative heart rate
        'respirationRate': -22  # Invalid negative respiration rate
    })
    data = response.get_json()

    assert response.status_code == 400
    assert data['error'] == 'Invalid input values'

def test_extreme_values(client):
    """Test prediction endpoint with extreme values."""
    response = client.post('/api/predictions', json={
        'temperature': 150,  # Unrealistically high temperature
        'heartRate': 500,    # Unrealistically high heart rate
        'respirationRate': 1000  # Unrealistically high respiration rate
    })
    data = response.get_json()

    assert response.status_code == 200
    assert 'prediction' in data

def test_missing_json_body(client):
    """Test prediction endpoint with missing JSON body."""
    response = client.post('/api/predictions')
    data = response.get_json()

    assert response.status_code == 400
    assert data['error'] == 'Invalid or missing JSON body'

def test_empty_json_payload(client):
    """Test prediction endpoint with an empty JSON payload."""
    response = client.post('/api/predictions', json={})
    data = response.get_json()

    assert response.status_code == 400
    assert data['error'] == 'Missing required fields'

def test_repeated_predictions(client):
    """Test consistent predictions for the same input."""
    payload = {
        'temperature': 39.5,
        'heartRate': 78,
        'respirationRate': 22
    }

    response1 = client.post('/api/predictions', json=payload)
    response2 = client.post('/api/predictions', json=payload)

    prediction1 = response1.get_json()['prediction']
    prediction2 = response2.get_json()['prediction']

    assert response1.status_code == 200
    assert response2.status_code == 200
    assert prediction1 == prediction2

