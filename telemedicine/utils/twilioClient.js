const twilio = require("twilio");
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const createVideoRoom = async (uniqueName) => {
  try {
    const room = await client.video.v1.rooms.create({
      uniqueName,
      type: "group",
    });
    return room.sid;
  } catch (err) {
    throw new Error(`Failed to create Twilio video room: ${err.message}`);
  }
};

module.exports = { createVideoRoom };
