const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/services/telemedicine-service"); // Import the user service
const Appointment = require("../src/services/telemedicine-service/models/Appointment"); // Import the SensorData model

const dotenv = require("dotenv");

dotenv.config();

// Connect to a test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
});

// Clean up the database after each test
afterEach(async () => {
  await Appointment.deleteMany();
});

// Disconnect from the test database
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Telemedicine Service", () => {
  // Test for creating an appointment
  it("should create a new appointment", async () => {
    const response = await request(app).post("/api/appointments").send({
      farmerId: new mongoose.Types.ObjectId(),
      vetId: new mongoose.Types.ObjectId(),
      livestockId: new mongoose.Types.ObjectId(),
      scheduledAt: new Date(),
      notes: "Cow showing symptoms of fever",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Appointment created successfully");
    expect(response.body.appointment).toHaveProperty("_id");
    expect(response.body.appointment.notes).toBe(
      "Cow showing symptoms of fever"
    );
  });

  // Test for getting farmer appointments
  it("should fetch all appointments for a farmer", async () => {
    const farmerId = new mongoose.Types.ObjectId();

    // Seed the database with appointments
    const res = await Appointment.create([
      {
        farmerId,
        vetId: new mongoose.Types.ObjectId(),
        livestockId: new mongoose.Types.ObjectId(),
        scheduledAt: new Date(),
        notes: "Check cow health",
      },
      {
        farmerId,
        vetId: new mongoose.Types.ObjectId(),
        livestockId: new mongoose.Types.ObjectId(),
        scheduledAt: new Date(),
        notes: "Goat vaccination",
      },
    ]);

    const response = await request(app).get(
      `/api/appointments/farmer/${farmerId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(
      response.body.some(
        (appointment) => appointment.notes === "Check cow health"
      )
    ).toBe(true);
    expect(
      response.body.some(
        (appointment) => appointment.notes === "Goat vaccination"
      )
    ).toBe(true);
  });
  it("should create a new appointment", async () => {
    const response = await request(app).post("/api/appointments").send({
      farmerId: "123", // Valid farmer ID from mock data
      vetId: "456", // Valid vet ID from mock data
      livestockId: "789",
      scheduledAt: "2024-12-28T10:00:00Z",
      notes: "Check cow's health",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Appointment created successfully");
    expect(response.body.appointment).toHaveProperty("_id");
    expect(response.body.appointment.farmerId).toBe("123");
    expect(response.body.appointment.vetId).toBe("456");
  });

  // Test: Missing required fields
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app).post("/api/appointments").send({
      vetId: "456", // Missing farmerId, livestockId, and scheduledAt
      notes: "Follow-up check",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Missing required fields");
  });

  // Test: Get all appointments for a farmer
  it("should fetch all appointments for a farmer", async () => {
    // Seed the database with appointments
    await Appointment.create([
      {
        farmerId: "123",
        vetId: "456",
        livestockId: "789",
        scheduledAt: "2024-12-28T10:00:00Z",
        notes: "Health check",
      },
      {
        farmerId: "123",
        vetId: "456",
        livestockId: "1234",
        scheduledAt: "2024-12-29T14:00:00Z",
        notes: "Vaccination",
      },
    ]);

    const response = await request(app).get("/api/appointments/farmer/123");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(
      response.body.some((appointment) => appointment.notes === "Health check")
    ).toBe(true);
    expect(
      response.body.some((appointment) => appointment.notes === "Vaccination")
    ).toBe(true);
  });

  // Test: Get all appointments for a vet
  it("should fetch all appointments for a vet", async () => {
    // Seed the database with appointments
    await Appointment.create([
      {
        farmerId: "123",
        vetId: "456",
        livestockId: "789",
        scheduledAt: "2024-12-28T10:00:00Z",
        notes: "Health check",
      },
      {
        farmerId: "1234",
        vetId: "456",
        livestockId: "1234",
        scheduledAt: "2024-12-29T14:00:00Z",
        notes: "Vaccination",
      },
    ]);

    const response = await request(app).get("/api/appointments/vet/456");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(
      response.body.some((appointment) => appointment.notes === "Health check")
    ).toBe(true);
    expect(
      response.body.some((appointment) => appointment.notes === "Vaccination")
    ).toBe(true);
  });

  // Test: Update appointment status
  it("should update the status of an appointment", async () => {
    const appointment = await Appointment.create({
      farmerId: "123",
      vetId: "456",
      livestockId: "789",
      scheduledAt: "2024-12-28T10:00:00Z",
      status: "pending",
    });

    const response = await request(app)
      .put(`/api/appointments/${appointment._id}/status`)
      .send({
        status: "completed",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Appointment status updated");
    expect(response.body.appointment.status).toBe("completed");
  });

  // Test: Appointment not found for update
  it("should return 404 if the appointment is not found", async () => {
    const response = await request(app)
      .put(`/api/appointments/612f7b1b4f3b7b001f0f6e1d/status`)
      .send({
        status: "completed",
      });

    console.log(response.body);

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Appointment not found");
  });
});
