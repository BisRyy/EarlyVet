const request = require("supertest");
const app = require("../src/services/notification-service/index"); //
describe("Notification Service (without mocking)", () => {
  // Email Notification Test
  // it("should send an email notification successfully", async () => {
  //   const response = await request(app).post("/api/notifications/email").send({
  //     to: "devbisry@gmail.com", // Replace with a valid recipient email
  //     subject: "Test Email Notification",
  //     text: "This is a test email sent from the Notification Service.",
  //   });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.message).toBe("Email sent successfully");
  // });

  it("should check server health", async () => {
    const res = await request(app).get("/api/notifications/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("User Service is running");
  });

  // // SMS Notification Test
  // it("should send an SMS notification successfully", async () => {
  //   const response = await request(app).post("/api/notifications/sms").send({
  //     to: "+251925698348", // Replace with a verified Twilio recipient phone number
  //     message: "This is a test SMS sent from the Notification Service.",
  //   });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.message).toBe("SMS sent successfully");
  // });
});
