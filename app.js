const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();

// Menyajikan 'index.html' di root folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(cors());
// Middleware untuk menangani data JSON
app.use(express.json());

// Buat stream log untuk mencatat error
const errorLogStream = fs.createWriteStream(path.join(__dirname, "error.log"), {
  flags: "a",
});

// Middleware untuk mencatat error ke file log
app.use((err, req, res, next) => {
  const errorDetails = `[${new Date().toISOString()}] ${
    err.stack || err.message
  }\n`;
  errorLogStream.write(errorDetails); // Catat error ke file
  console.error(err); // Tampilkan error di konsol
  res.status(500).send("Internal Server Error"); // Tanggapi klien
});

// Konfigurasi transport Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Ganti dengan email Anda
    pass: process.env.EMAIL_PASSWORD, // Ganti dengan password email Anda
  },
});

// Endpoint untuk menerima data form dan mengirim email
app.post('/send-email', (req, res) => {
  console.log('Received request:', req.body);
  
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: 'Pesan Baru Dari Website Anda',
      text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Email send error:', error);
          return res.status(500).json({ error: 'Failed to send email' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
