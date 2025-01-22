import {
  Livestock,
  CreateLivestockData,
  UpdateLivestockData,
  LivestockResponse,
  Sensor,
  CreateSensorData,
  SensorReading,
  DiseasePrediction,
  SensorValue,
} from "./types";

const API_URL =
  process.env.SENSORSERVER_SERVICE_HOST +
    ":" +
    process.env.SENSORSERVER_SERVICE_PORT || "sensorserver.com";

export async function getLivestock(): Promise<Livestock[]> {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");
  console.log("user", user);
  return apiFetch("");
}

export async function getSensors(): Promise<Sensor[]> {
  return [
    {
      _id: "sensor1",
      name: "Temperature Sensor A",
      type: "temperature",
      status: "active",
      lastReading: 23.5,
      lastReadingTime: new Date().toISOString(),
      batteryLevel: 95,
      livestockId: "livestock123",
      collarId: "collarABC",
    },
    {
      _id: "sensor2",
      name: "Heart Rate Sensor B",
      type: "heart-rate",
      status: "inactive",
      lastReading: 80,
      lastReadingTime: new Date().toISOString(),
      batteryLevel: 75,
      livestockId: "livestock456",
      collarId: "collarDEF",
    },
    {
      _id: "sensor3",
      name: "Activity Sensor C",
      type: "activity",
      status: "maintenance",
      lastReading: 5,
      lastReadingTime: new Date().toISOString(),
      batteryLevel: 50,
      livestockId: "livestock789",
      collarId: "collarGHI",
    },
  ];
}

export async function createSensor(data: CreateSensorData): Promise<Sensor> {
  return apiFetch("sensors", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getSensorReadings(
  sensorId: string
): Promise<SensorValue[]> {
  return [
    {
      _id: "reading1",
      sensorId,
      value: 3.5,
      timestamp: new Date().toISOString(),
      type: "temperature",
    },
    {
      _id: "reading2",
      sensorId,
      value: 14.0,
      timestamp: new Date().toISOString(),
      type: "temperature",
    },
    {
      _id: "reading3",
      sensorId,
      value: 22.8,
      timestamp: new Date().toISOString(),
      type: "temperature",
    },
  ];
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  if (response.status !== 204) {
    return response.json();
  }
}

export async function generatePrediction(
  livestockId: string,
  token: string
): Promise<DiseasePrediction> {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_PREDICTION_SERVICE}/predictions/generate/${livestockId}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );

  // if (!response.ok) {
  //   throw new Error("Failed to generate prediction");
  // }

  return {
    id: "prediction123",
    livestockId,
    disease: "Sample Disease",
    probability: 0.8,
    symptoms: [
      "Slightly elevated body temperature",
      "Reduced milk production",
      "Minor changes in milk composition",
      "Subtle changes in feeding behavior",
    ],
    recommendedActions: [
      "Schedule immediate veterinary examination",
      "Isolate from healthy cattle",
      "Begin monitoring milk quality daily",
      "Prepare for potential antibiotic treatment",
    ],
    timestamp: new Date().toISOString(),
  };
}

export async function getLivestockSensorData(livestockId: string): Promise<{
  temperature: SensorValue[];
  heartRate: SensorValue[];
  activity: SensorValue[];
}> {
  return {
    temperature: Array.from({ length: 24 }, (_, i) => ({
      _id: `t${i}`,
      sensorId: "s789",
      value: 38.5 + Math.sin(i / 3) * 0.3,
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      type: "temperature",
    })),
    heartRate: Array.from({ length: 24 }, (_, i) => ({
      _id: `h${i}`,
      sensorId: "s790",
      value: 65 + Math.sin(i / 2) * 5,
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      type: "heart-rate",
    })),
    activity: Array.from({ length: 24 }, (_, i) => ({
      _id: `a${i}`,
      sensorId: "s791",
      value: 250 + Math.sin(i / 4) * 100,
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      type: "activity",
    })),
  };
}
