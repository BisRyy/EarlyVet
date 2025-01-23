# EarlyVet Distributed System

**EarlyVet** is a comprehensive distributed microservice-based system designed to enhance livestock management and healthcare. The system integrates various services to provide functionalities such as livestock registration, real-time sensor data monitoring, disease prediction using machine learning, and telemedicine support for farmers and veterinarians.

## ![EarlyVet System](/assets/1.png)

## **System Features**

1. **User Management Service**:

   - Handles user authentication and authorization.
   - Manages user accounts and roles (e.g., farmers, veterinarians, system admins).

2. **Livestock Management Service**:

   - Enables farmers to register and manage their herds.
   - Tracks livestock details such as health history, age, breed, and more.

3. **Sensor Server**:

   - Collects real-time data from sensors attached to livestock (e.g., temperature, heart rate, movement).
   - Stores and processes sensor data for health monitoring.

4. **Sensor Sender**:

   - Acts as a client that sends mock or real sensor data to the Sensor Server using WebSocket communication.

5. **Prediction Service**:

   - Uses machine learning models to predict potential diseases based on livestock data and sensor inputs.
   - Sends disease prediction results to the Notification Service.

6. **Notification Service**:

   - Sends email and SMS notifications to farmers and veterinarians regarding livestock health alerts or predictions.
   - Ensures timely delivery of critical information.

7. **Telemedicine Service**:

   - Connects farmers with veterinarians for remote consultations.
   - Facilitates appointment booking and communication between stakeholders.

8. **Video Chat Service**:

   - Provides live video conferencing capabilities for farmers and veterinarians.
   - Integrated into the Telemedicine Service to enhance remote consultations.

9. **Mobile Application**:

   - Offers a user-friendly interface for farmers and veterinarians to interact with the system.
   - Supports both mobile and desktop platforms for ease of access.

---

## **Directory Structure Overview**

```
└── bisryy-earlyvet/
    ├── diseaseprediction/          # Handles disease prediction using machine learning
    ├── earlyapp/                   # Mobile and desktop application for user interaction
    ├── earlyvet-auth/              # User authentication and authorization
    ├── livestockmanagement/        # Livestock registration and management
    ├── notification/               # Email and SMS notifications
    ├── prediction/                 # Disease prediction service
    ├── rabbit/                     # RabbitMQ configuration for asynchronous messaging
    ├── sensormanagement/           # Sensor server for gathering data
    ├── sensorsender/               # Sends sensor data to the server via WebSocket
    ├── sensorserver/               # Processes real-time sensor data from Sensor Sender
    ├── telemedicine/               # Connects farmers and veterinarians, handles appointments
    ├── usermanagement/             # User management service for authentication
    ├── videochat/                  # Provides live video chat functionality
    └── .github/                    # GitHub workflows for CI/CD
```

---

## **Services and Their Functionalities**

### **1. User Management Service**

- **Purpose**: Manages user authentication and authorization.
- **Features**:
  - Secure login and registration.
  - Role-based access control (e.g., farmers, veterinarians).
- **Key Files**:
  - `usermanagement/src/services/user-service/`: Contains the main logic for user authentication.
  - `usermanagement/manifests/`: Kubernetes deployment files for the service.
    ![User Dashboard](/assets/2.png)

### **2. Livestock Management Service**

- **Purpose**: Allows farmers to register and manage livestock details.
- **Features**:
  - Register herds with details such as name, breed, and health history.
  - Update livestock records.
- **Key Files**:
  - `livestockmanagement/src/services/livestock-service/`: Logic for managing livestock data.
  - `livestockmanagement/manifests/`: Kubernetes deployment files.
    ![Livestock Dashboard](/assets/4.png)

### **3. Sensor Server**

- **Purpose**: Collects real-time data from sensors.
- **Features**:
  - Stores livestock sensor data (e.g., temperature, movement).
  - Processes incoming data for further analysis.
- **Key Files**:
  - `sensormanagement/src/services/sensor-service/`: Handles incoming sensor data.
  - `sensormanagement/manifests/`: Kubernetes deployment files.
    ![Sensor Dashboard](/assets/5.png)

### **4. Sensor Sender**

- **Purpose**: Simulates or sends real sensor data to the Sensor Server using WebSocket.
- **Features**:
  - Sends mock data for testing or real data from sensors.
- **Key Files**:
  - `sensorsender/server.js`: Main script for sending sensor data.
  - `sensorsender/manifests/`: Kubernetes deployment files.

### **5. Prediction Service**

- **Purpose**: Processes sensor and livestock data to predict potential diseases.
- **Features**:
  - Runs machine learning models to generate disease predictions.
  - Publishes predictions to RabbitMQ for further processing.
- **Key Files**:
  - `prediction/server.js`: Logic for handling prediction requests.
  - `prediction/manifests/`: Kubernetes deployment files.
    ![Prediction Dashboard](/assets/6.png)

### **6. Notification Service**

- **Purpose**: Sends health alerts to farmers and veterinarians.
- **Features**:
  - Sends emails and SMS notifications based on prediction results.
- **Key Files**:
  - `notification/src/services/notification-service/`: Handles notification logic.
  - `notification/manifests/`: Kubernetes deployment files.
    ![Notification Dashboard](/assets/7.png)

### **7. Telemedicine Service**

- **Purpose**: Facilitates remote consultations between farmers and veterinarians.
- **Features**:
  - Appointment booking and scheduling.
  - Integration with the Video Chat Service for live consultations.
- **Key Files**:
  - `telemedicine/src/services/telemedicine-service/`: Appointment management logic.
  - `telemedicine/manifests/`: Kubernetes deployment files.[In Progress]

### **8. Video Chat Service**

- **Purpose**: Provides live video conferencing for remote consultations.
- **Features**:
  - Video and audio communication.
  - Secure connections between farmers and veterinarians.
- **Key Files**:
  - `videochat/src/`: Logic for video chat functionality. [In Progress]

### **9. Mobile Application**

- **Purpose**: Offers a user-friendly interface for interacting with the system.
- **Features**:
  - Supports both mobile and desktop platforms.
  - Allows farmers and veterinarians to access system functionalities.
- **Key Files**:
  - `earlyapp/`:Flutter code for the mobile application.

![Mobile App](/assets/15.png)

### **10. RabbitMQ**

- **Purpose**: Acts as a message broker for asynchronous communication between services.
- **Features**:
  - `prediction_requests` queue: Holds prediction job requests.
  - `prediction_responses` queue: Holds prediction results.
- **Key Files**:
  - `rabbit/manifests/`: RabbitMQ configuration files.
    ![RabbitMQ Dashboard](/assets/9.png)

---

## **How It Works**

1. **User Authentication**:

   - Users (farmers or veterinarians) authenticate through the User Management Service.

2. **Livestock Registration**:

   - Farmers register livestock details via the Livestock Management Service.

3. **Sensor Data Collection**:

   - Sensor Sender sends real-time data to the Sensor Server.
   - Sensor Server processes and stores sensor data for analysis.

4. **Disease Prediction**:

   - Prediction Service processes livestock and sensor data using machine learning.
   - Prediction results are sent to the Notification Service via RabbitMQ.

5. **Notifications**:

   - Farmers and veterinarians receive alerts about potential diseases via email or SMS.

6. **Telemedicine**:
   - Farmers book appointments with veterinarians through the Telemedicine Service.
   - Consultations occur via the Video Chat Service.

---

## **Deployment**

### **Requirements**:

- Docker and Kubernetes.
- RabbitMQ and MongoDB.

### **Steps**:

1. Deploy RabbitMQ:
   ```bash
   kubectl apply -f rabbit/manifests/
   ```
2. Deploy Each Service:
   ```bash
   kubectl apply -f <service-directory>/manifests/
   ```
3. Verify Deployments:
   ```bash
   kubectl get pods
   kubectl get services
   ```
   ![Deployment](/assets/10.png)

---

## **Future Enhancements**

- Integrate advanced analytics and reporting.
- Replace mock prediction with a real ML model.
- Implement role-based notifications.
- Enhance mobile application functionality.

---

## **Team Members**

| Name              | ID          |
| ----------------- | ----------- |
| Amanuel Ayana     | ETS 0110/13 |
| Amanuel Dagnachew | ETS 0112/13 |
| Amanuel Mandefro  | ETS 0121/13 |
| Amanuel Solomon   | ETS 0126/13 |
| Ararsa Derese     | ETS 0152/13 |
| Beamanuel Tesfaye | ETS 0180/13 |
| Birhanu Worku     | ETS 0279/13 |
| Biruk Mesfin      | ETS 0290/13 |
| Bisrat Kebere     | ETS 0306/13 |
| Biyaol Mesay      | ETS 0309/13 |

---

## **License**

This project is licensed under the MIT License.
