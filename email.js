const express = require('express');
var nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package 

const app = express();
const PORT = 4502;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to handle CORS headers

// Middleware to handle CORS and preflight requests
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});

app.post('/api/email', async (req, res) => {
  try {
    const data = req.body;

    var transporter = nodemailer.createTransport({
      // service: "gmail",			
      // auth: {
      //   user: process.env.NODEMAILER_EMAIL,
      //   pass: process.env.NODEMAILER_PW,
      // },
      port: 587,
      host: "smtp.gmail.com",
      auth: {
        user: 'abhinav.jha195@gmail.com',
        pass: 'upasoggdoennpvud',
      },
      secure: false,
    });
  
    var mailOptions = {
      from: 'abhinav.jha195@gmail.com',						
      to: data.email,
      subject: data.subject,
      html: data.message,			
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
       
        res.status(500).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    });


    res.status(200).json({ status: true });
  } catch (error) {
    res.status(200).json({ status: true });
  }
});

// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
