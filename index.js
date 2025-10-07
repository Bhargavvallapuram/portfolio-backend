import express from "express";
import axios from "axios"; // Not used currently, can be removed if unnecessary
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Initialize environment variables
dotenv.config();

const app = express();
const port = 3000;

// Use environment variable for email password
const pass = process.env.pass;
if (!pass) {
  console.error("❌ ERROR: Email password (pass) is not defined in .env");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhargavvaallapuram@gmail.com",
    pass: pass,
  },
});

// Route to handle contact form submissions
app.post("/contact", async (req, res) => {
  const { name, email, phone, purpose } = req.body;

  const mailOptions = {
    from: "bhargavvaallapuram@gmail.com",
    to: "bhargavvaallapuram@gmail.com",
    subject: "Your portfolio - Contact Request",
    html: `<center>
            <h3>Name: ${name}</h3>
            <h3>Email: ${email}</h3>
            <h3>Phone: ${phone}</h3>
            <h3>Purpose: ${purpose}</h3>
          </center>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log("Received Contact Form Submission:", { name, email, phone, purpose });
    res.status(200).json({ message: "Form submission successful" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

// Route to handle service form submissions
app.post("/Service", async (req, res) => {
  const { serviceType, contactName, email, phone, projectOrSubject, details } = req.body;

  const mailOptions = {
    from: "bhargavvaallapuram@gmail.com",
    to: "bhargavvaallapuram@gmail.com",
    subject: "Your portfolio - Service Request",
    html: `<center>
            <h3>Service: ${serviceType}</h3>
            <h3>Contact Name: ${contactName}</h3>
            <h3>Email: ${email}</h3>
            <h3>Phone: ${phone}</h3>
            <h3>Project or Subject: ${projectOrSubject}</h3>
            <h3>Details: ${details}</h3>
          </center>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log("Received Service Request:", { serviceType, contactName, email, phone, projectOrSubject, details });
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Server error, could not send email." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
