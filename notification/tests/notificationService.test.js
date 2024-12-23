const request = require("supertest");
const app = require("../src/services/notification-service/index"); //
describe("Notification Service (without mocking)", () => {
  // Email Notification Test
  it("should send an email notification successfully", async () => {
    const response = await request(app).post("/api/notifications/email").send({
      to: "devbisry@gmail.com", // Replace with a valid recipient email
      subject: "Test Email Notification",
      text: "This is a test email sent from the Notification Service.",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Email sent successfully");
  });

  // SMS Notification Test
  it("should send an SMS notification successfully", async () => {
    const response = await request(app).post("/api/notifications/sms").send({
      to: "+251925698349", // Replace with a verified Twilio recipient phone number
      message: "This is a test SMS sent from the Notification Service.",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("SMS sent successfully");
  });
});
