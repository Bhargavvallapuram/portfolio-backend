import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const app = express();

const port = 3000;
dotenv.config();
const pass=process.env.pass;

// Middleware
app.use(cors());
app.use(bodyParser.json());


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
      user: 'bhargavvaallapuram@gmail.com',
      pass: pass
    }
  });


// Route to handle contact form submissions
app.post("/contact", async(req, res) => {
  const { name, email, phone, purpose } = req.body;
  const mailOptions = {
    from:'bhargavvaallapuram@gmail.com', // Sender email
    to:'bhargavvaallapuram@gmail.com' ,
    subject: "Your portifolio -contact-request",
    html: `<center>
          <h3>Name: ${name}</h3>
          <h3>Email: ${email}</h3>
          <h3>Phone: ${phone}</h3>
          <h3>Purpose: ${purpose}</h3>
        </center>` ,
  };
  
await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        console.log("Received Contact Form Submission:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Purpose:", purpose);
        res.status(200).json({ message: "Form submission successful" });
    }
});
});

app.post("/Service", async(req, res) => {
  const {serviceType,contactName,email,phone,projectOrSubject,details} = req.body;
  const mailOptions = {
    from:'bhargavvaallapuram@gmail.com', // Sender email
    to:'bhargavvaallapuram@gmail.com' ,
    subject: "Your portifolio -Services-request",
    html: `<center>
          <h3>Serivce: ${serviceType}</h3>
          <h3>Email: ${email}</h3>
          <h3>Phone: ${phone}</h3>
          <h3>project Or subject: ${projectOrSubject}</h3>
          <h3>projectDetails Or subjectDetails: ${details}</h3>
        </center>` ,
  };
  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        res.status(501).json({message:"server not responding"});
        console.log(error);

    }
    else{
        console.log("Received data:", serviceType,contactName,email,projectOrSubject,details,);
        // Here you can save the data to a database or process it further
        res.status(200).json({ message: "Form submitted successfully!" });
    }
  });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})