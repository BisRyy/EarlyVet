# Animal Disease Prediction Microservice

This microservice predicts a animal's health condition (e.g., "healthy," "sick," or "critical") based on input parameters such as body temperature, heart rate, and respiration rate. 
It uses a machine learning model trained with scikit-learn to make predictions and provides an API for client applications to interact with the service.


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)


## Features

- **Machine Learning Integration**: Utilizes a Random Forest Classifier for disease prediction.
- **REST API**: Flask-based REST API for predictions.
- **Input Validation**: Handles invalid or missing input gracefully with appropriate error responses.
- **Unit Tests**: Comprehensive test suite to ensure reliability.


## Technologies Used

- **Programming Language**: Python
- **Frameworks/Libraries**:
  - Flask (API development)
  - scikit-learn (Machine Learning)
  - NumPy (Numerical computations)
  - pytest (Unit testing)


## Installation

### Prerequisites

Ensure you have Python 3.8 or higher installed on your system.

### Steps

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder> 
2. Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```
3. Run the service:
 ```bash
  python app.py
The API will be available at http://localhost:5003.
  ```

### Usage

1. Running Locally
Start the Flask server using:
  ```bash
  python app.py
  ```
2. Example Request
Endpoint: /api/predictions
Method: POST
Request Body:
  ```bash
{
  "temperature": 39.5,
  "heartRate": 78,
  "respirationRate": 22
}
  ```
Response:
  ```bash
{
  "message": "Prediction successful",
  "prediction": "sick",
  "input": {
    "temperature": 39.5,
    "heartRate": 78,
    "respirationRate": 22
  }
}
```
