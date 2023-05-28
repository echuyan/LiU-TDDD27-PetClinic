const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");

// Create new user (pet owner)
router.post("/SignUp", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const familyname = req.body.familyname;
  // Hashing and salting the password
  const salt = await bcrypt.genSalt(6);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const sql = "insert into users (firstname,familyname,email,password,role)  values(?,?,?, ?,?)";
  console.log(sql);
  console.log(firstname);
  try {
    const request = await db.runAsync(sql, [firstname,familyname,email, hashedPassword,2]);
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user", detailedError: error.message });

  }
});

module.exports = router;
