//Libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Modules
const db = require("../database");

// Api request
// LogIn post request receiving login credentials from LogIn component
// and checking if valid in database
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
    
    //Bcrypt compare function comparing the password with hashed password
    //in database, if valid a token is returned
    bcrypt.compare(password, databasePassword, function (err, isMatch) {
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
    });
  }
});
module.exports = router;
