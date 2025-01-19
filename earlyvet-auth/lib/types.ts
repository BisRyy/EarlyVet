export interface Livestock {
  _id: string;
  name: string;
  type: "cow" | "sheep" | "goat" | "cattle";
  dateOfBirth: string;
  weight: number;
  breed: string;
  gender: "male" | "female";
  healthStatus: "healthy" | "sick" | "critical";
  collarId: string;
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateLivestockData = Omit<
  Livestock,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateLivestockData = Partial<CreateLivestockData>;

export interface LivestockResponse {
  message: string;
  livestock: Livestock;
}

export interface Sensor {
  _id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "maintenance";
  lastReading: number;
  lastReadingTime: string;
  batteryLevel: number;
  livestockId: string;
  collarId: string;
}

export type CreateSensorData = Omit<
  Sensor,
  "_id" | "lastReading" | "lastReadingTime"
>;
export type UpdateSensorData = Partial<CreateSensorData>;

export interface SensorReading {
  deviceId: string;
  temperature: number;
  heartRate: number;
  activity: number;
  bloodPressure: number;
  location: string;
  timestamp: string;
}

export interface DiseasePrediction {
  id: string;
  livestockId: string;
  disease: string;
  probability: number;
  symptoms: string[];
  recommendedActions: string[];
  timestamp: string;
}

export interface LivestockDetails extends Livestock {
  vaccinationHistory: {
    name: string;
    date: string;
  }[];
  medicalHistory: {
    condition: string;
    date: string;
    treatment: string;
  }[];
}
