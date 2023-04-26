const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");

// Create new user
router.post("/SignUp", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Hashing and salting the password
  const salt = await bcrypt.genSalt(6);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const sql = "insert into users (firstname,familyname,email,password)  values(?,?,?, ?)";
  console.log(sql);
  const request = await db.runAsync(sql, ["Elena","Chuyan",email, hashedPassword]);


});

module.exports = router;
