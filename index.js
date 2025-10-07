import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Reusable function to send email via Resend
async function sendEmail({ subject, html }) {
  try {
    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from: "onboarding@resend.dev", // Use your verified domain if available
        to: ["bhargavvaallapuram@gmail.com"],
        subject,
        html,
      },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent:", response.data);
    return true;
  } catch (err) {
    console.error("❌ Error sending email:", err.response?.data || err.message);
    return false;
  }
}

// Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, phone, purpose } = req.body;

  const html = `
    <center>
      <h3>Name: ${name}</h3>
      <h3>Email: ${email}</h3>
      <h3>Phone: ${phone}</h3>
      <h3>Purpose: ${purpose}</h3>
    </center>`;

  const success = await sendEmail({
    subject: "Portfolio - Contact Request",
    html,
  });

  if (success) {
    res.status(200).json({ message: "Contact form submitted successfully" });
  } else {
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Service form route
app.post("/service", async (req, res) => {
  const { serviceType, contactName, email, phone, projectOrSubject, details } = req.body;

  const html = `
    <center>
      <h3>Service: ${serviceType}</h3>
      <h3>Contact Name: ${contactName}</h3>
      <h3>Email: ${email}</h3>
      <h3>Phone: ${phone}</h3>
      <h3>Project/Subject: ${projectOrSubject}</h3>
      <h3>Details: ${details}</h3>
    </center>`;

  const success = await sendEmail({
    subject: "Portfolio - Service Request",
    html,
  });

  if (success) {
    res.status(200).json({ message: "Service form submitted successfully" });
  } else {
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
