const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../database");

const resetPasswordTokens = new Map();

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'mail.smtp2go.com',
  port: 2525,
  secure: false,
  auth: {
    user: 'MailerPetClinic',
    pass: 'Sc4SKFw626sd7WTM',
  },
});

//get a password change request, generate unique token and send a mail
router.post('/forgot-password', (req, res) => {
  const email  = req.body.email;
  const resetToken =  uuidv4();

  resetPasswordTokens.set(resetToken, { email, createdAt: new Date() });

  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
 
  const mailOptions = {
    from: 'otustestchuyan@gmail.com',
    to: email,
    subject: 'Password reset',
    text: 'Follow the link to change the password: ' + resetUrl,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.send('Password reset email sent!');
});


//change the password in DB if the token is correct
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
   
   if (resetPasswordTokens.has(token)) {
    const useremail = resetPasswordTokens.get(token).email;
    
    // Hashing and salting the password
   const salt = await bcrypt.genSalt(6);
   const hashedPassword = await bcrypt.hash(password, salt);


    const sql = "UPDATE users set password = (?) WHERE email = (?)";
   
    try {
      const request = await db.runAsync(sql, [hashedPassword,useremail]);
      
      resetPasswordTokens.delete(token);
      res.json({ message: "Password changed successfully" });
      
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Failed to change password", detailedError: error.message });
  
    }

  } else {
    console.error("Error changing password:");
    res.status(500).json({ error: "Wrong token"});
  }
});



//login
router.post("/LogIn", async (req, res) => {
  const email = req.body.email;
  user = email;
  const password = req.body.password;
  var auth = false;
  var token = " ";
  const sql = "SELECT * FROM users WHERE (email) = (?)";
  const getUser = await db.getAsync(sql, email);

  if (getUser === undefined) {
    auth = false;
    res.json({
      auth: false,
      message: "No such user",
    });
  } else {
    const databasePassword = getUser.password;
    
    bcrypt.compare(password, databasePassword, async function (err, isMatch) {
      if (err) {
        throw err;
      } 
      else if (!isMatch) 
      {
        auth = false;
        res.json({ email: email, auth: auth });
      } 
      else {
        token = jwt.sign({ email }, "jwtSecret", {expiresIn: "5s",});
        auth = true;
        const role = getUser.role;
        const firstname = getUser.firstname;
        const familyname = getUser.familyname;
        const specialization = getUser.specialization;
        const phone = getUser.phone;
        const photo = getUser.photo;

        const sql = "UPDATE users set token = (?) WHERE email = (?)";
   
        try {
          const request = await db.runAsync(sql, [token,email]);
          res.json({ email: email, 
            auth: true, 
            token: token,
            firstname:firstname,
            familyname:familyname,
            role:role,
            specialization:specialization,
            phone:phone,
            photo:photo,
            email: email });
        }

        catch (error) {
          console.error("Error logging in", error);
          res.status(500).json({ error: "Failed to log in", detailedError: error.message });
      
        }
        
      }
    });
  }
});
module.exports = router;
