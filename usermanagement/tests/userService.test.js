const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/services/user-service"); // Import the user service
const dotenv = require("dotenv");

dotenv.config();
// Connect to a test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Clean up the database after each test
afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

// Disconnect from the test database
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Service", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      role: "farmer",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("johndoe@example.com");
  });

  it("should fail to register a user with missing fields", async () => {
    const res = await request(app).post("/api/users/register").send({
      email: "johndoe@example.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should log in a registered user", async () => {
    // Register a user
    await request(app).post("/api/users/register").send({
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: "password123",
      role: "veterinarian",
    });

    // Log in the user
    const res = await request(app).post("/api/users/login").send({
      email: "janedoe@example.com",
      password: "password123",
    });

    expect(res.body).toHaveProperty("token");
    expect(res.statusCode).toBe(200);
  });

  it("should fail to log in with incorrect password", async () => {
    // Register a user
    await request(app).post("/api/users/register").send({
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: "password123",
      role: "veterinarian",
    });

    // Attempt to log in with incorrect password
    const res = await request(app).post("/api/users/login").send({
      email: "janedoe@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  it("should fetch all users", async () => {
    // Register a couple of users
    await request(app).post("/api/users/register").send({
      name: "User One",
      email: "userone@example.com",
      password: "password123",
      role: "farmer",
    });

    await request(app).post("/api/users/register").send({
      name: "User Two",
      email: "usertwo@example.com",
      password: "password123",
      role: "veterinarian",
    });

    // Fetch all users
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
