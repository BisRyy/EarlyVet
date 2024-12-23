const { Resend } = require("resend");

const resend = new Resend("re_ezfUrjU8_LJ1pYXacG5ExPkTMuL24orXF");

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "NEBE VDMS <NEBE@vdms.aastu.software>", // Update this with your verified domain
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    console.log(`Email sent to ${to}`, { data });
  } catch (err) {
    console.error("Error sending email:", err.message);
    throw err;
  }
};

module.exports = sendEmail;
