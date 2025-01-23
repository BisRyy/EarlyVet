const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/services/livestock-service"); // Import the user service
const Livestock = require("../src/services/livestock-service/models/Livestock"); // Import the Livestock model
const dotenv = require("dotenv");

dotenv.config();
// Connect to a test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
});

// Clean up the database after each test
afterEach(async () => {
  await Livestock.deleteMany();
});

// Disconnect from the database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Livestock Management Service", () => {
  it("should create a new livestock record", async () => {
    const res = await request(app).post("/api/livestock").send({
      name: "Bella",
      type: "cow",
      age: 5,
      healthStatus: "healthy",
      collarId: "ABC123",
      ownerId: new mongoose.Types.ObjectId(),
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("livestock");
    expect(res.body.livestock.name).toBe("Bella");
  });
  

  it("should fetch all livestock records for an owner", async () => {
    const ownerId = new mongoose.Types.ObjectId();

    // Create sample livestock records
    await Livestock.create([
      { name: "Daisy", type: "cow", age: 4, collarId: "DEF456", ownerId },
      { name: "Molly", type: "goat", age: 2, collarId: "GHI789", ownerId },
    ]);

    const res = await request(app).get(`/api/livestock/owner/${ownerId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body.some((livestock) => livestock.name === "Daisy")).toBe(true);
    expect(res.body.some((livestock) => livestock.name === "Molly")).toBe(true);
  });

  it("should check server health", async () => {
    const res = await request(app).get("/api/livestock/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("User Service is running");
  });

  it("should delete a livestock record", async () => {
    const livestock = await Livestock.create({
      name: "Bessie",
      type: "cow",
      age: 6,
      collarId: "MNO123",
      ownerId: new mongoose.Types.ObjectId(),
    });

    const res = await request(app).delete(`/api/livestock/${livestock._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Livestock deleted");
  });

  it("should return 404 if livestock record to delete is not found", async () => {
    const res = await request(app).delete(
      `/api/livestock/${new mongoose.Types.ObjectId()}`
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Livestock not found");
  });
});
