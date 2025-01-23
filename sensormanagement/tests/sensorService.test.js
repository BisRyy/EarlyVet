const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/services/sensor-service/index"); // Import the main app
const SensorData = require("../src/services/sensor-service/models/SensorData"); // Import the SensorData model
const dotenv = require("dotenv");

dotenv.config();

// Connect to a test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
});

// Clean up the database after each test
afterEach(async () => {
  await SensorData.deleteMany();
});

// Disconnect from the database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sensor Data Processing Service", () => {
  it("should save MQTT sensor data to the database", async () => {
    // Simulate MQTT message ingestion
    const sampleData = {
      collarId: "COL123",
      temperature: 39.5,
      heartRate: 78,
      respirationRate: 22,
    };

    const sensorData = new SensorData(sampleData);
    await sensorData.save();

    const storedData = await SensorData.findOne({ collarId: "COL123" });

    expect(storedData).not.toBeNull();
    expect(storedData.temperature).toBe(39.5);
    expect(storedData.heartRate).toBe(78);
    expect(storedData.respirationRate).toBe(22);
  });

  it("should check server health", async () => {
    const res = await request(app).get("/api/sensor/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("User Service is running");
  });

  it("should fetch all sensor data for a specific collar ID", async () => {
    // Add sample data to the database
    const collarId = "COL456";
    await SensorData.create([
      { collarId, temperature: 38.5, heartRate: 75, respirationRate: 18 },
      { collarId, temperature: 39.0, heartRate: 80, respirationRate: 20 },
    ]);

    // Fetch the data using the API
    const res = await request(app).get(`/api/sensor/${collarId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body.some((sensor) => sensor.temperature === 38.5)).toBe(true);
    expect(res.body.some((sensor) => sensor.temperature === 39.0)).toBe(true);
  });

  // it("should fetch the latest sensor data for all collars", async () => {
  //   // Add sample data to the database
  //   await SensorData.create([
  //     {
  //       collarId: "COL123",
  //       temperature: 38.5,
  //       heartRate: 75,
  //       respirationRate: 18,
  //     },
  //     {
  //       collarId: "COL123",
  //       temperature: 39.0,
  //       heartRate: 80,
  //       respirationRate: 20,
  //     },
  //     {
  //       collarId: "COL789",
  //       temperature: 37.5,
  //       heartRate: 70,
  //       respirationRate: 15,
  //     },
  //   ]);

  //   // Fetch the latest data using the API
  //   const res = await request(app).get("/api/sensor/latest");

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.length).toBe(2);
  //   const collar123 = res.body.find((data) => data._id === "COL123");
  //   const collar789 = res.body.find((data) => data._id === "COL789");

  //   expect(collar123.latestData.temperature).toBe(39.0);
  //   expect(collar789.latestData.temperature).toBe(37.5);
  // });

  it("should return 404 if no sensor data exists for a collar ID", async () => {
    const res = await request(app).get("/api/sensor/UNKNOWN_COLLAR");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty(
      "message",
      "No data found for this collar ID."
    );
  });
});
