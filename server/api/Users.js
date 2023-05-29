const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

router.use(bodyParser.json()); 

// Fetching all userinfo from database and sending it to
// component
router.get("/Users/Fetch_all_userinfo", async (req, res) => {
  let sql = "SELECT DISTINCT * FROM users";
  let database = await db.allAsync(sql);
  return res.json(database);
});

router.get("/Users/GetAllDoctors", async (req, res) => {
  let sql = "SELECT DISTINCT * FROM users where role=3";
  let database = await db.allAsync(sql);
  return res.json(database);
});


router.get("/Users/GetUserByEmail/:email", async (req, res) => {
  console.log(req);
  const id = req.params.email;
  console.log(id);
  const sql = "SELECT * FROM users WHERE email = ?";
  const getUser = await db.getAsync(sql, id);

  if (getUser === undefined) {
    
    res.json({
        message: "No such user",
    });
  } else {
    res.json({
       user: getUser, 
    });
      }

  });

  router.get("/Users/GetUserByPetId/:petId", async (req, res) => {
    console.log(req);
    const petId = req.params.petId;
    
    const sql = "SELECT * FROM users WHERE id in  (SELECT ownerid from pets where id = ?)";
    const getUser = await db.getAsync(sql, petId);
  
    if (getUser === undefined) {
      
      res.json({
          message: "No such user",
      });
    } else {
      res.json({
         user: getUser, 
      });
        }
  
    });


router.post("/Users/GetUser", async (req, res) => {
  console.log(req);
  const email = req.body.username;
  console.log(email);
  const sql = "SELECT * FROM users WHERE email = ?";
  const getUser = await db.getAsync(sql, email);

  if (getUser === undefined) {
    auth = false;
    res.json({
      auth: false,
      message: "No such user",
    });
  } else {
    res.json({
      auth: true,
      user: getUser, 
    });
      }

  });

  router.post("/Users/GetPets", async (req, res) => {
    console.log(req);
    const email = req.body.username;
    console.log(email);
    const sql = "SELECT * FROM pets WHERE ownerid in (SELECT id from users where email = ?)";
    const getPet = await db.allAsync(sql, email);
  
    if (getPet === undefined) {
      auth = false;
      res.json({
        auth: false,
        message: "No such user",
      });
    } else {
     res.json({
        auth: true,
        pets: getPet, 
      });
     
        }
  
    });


    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../client/src/static")); 
      },
      filename: (req, file, cb) => {
        const fileName = `/${Date.now()}_${file.originalname}`;
        cb(null, fileName);
      },
    });
    
    
    const upload = multer({ storage });
  
    router.post("/Users/UpdateUser", upload.single("photo"), async (req, res) => {
      const email = req.body.email;
      const firstname = req.body.firstname;
      const familyname = req.body.familyname;
     
      const photo =  req.file ? req.file.filename : null;
      const sql = "UPDATE users SET firstname = ?, familyname = ?, email = ?, photo = ? WHERE email = ?";
    
      try {
        await db.runAsync(sql, [firstname, familyname, email, photo, email]);
    
        res.json({ message: "User updated successfully" });
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user", detailedError: error.message });
      }
    });
    
    // Error handling middleware
    router.use((err, req, res, next) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error", detailedError: err.message });
    });



    // Create new user 
router.post("/Users/AddUser", upload.single("photo"), async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const familyname = req.body.familyname;
  const role = req.body.role;
  let insrole;
  if (role=='Doctor') {
     insrole=3;
  }
  else {
     insrole=2;
  }
  const specialization = req.body.specialization;
  const photo =  req.file ? req.file.filename : null;
  const phone = req.body.phone;

  // Hashing and salting the password
  const salt = await bcrypt.genSalt(6);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const sql = "insert into users (firstname,familyname,email,password,role,specialization,photo,phone)  values(?,?,?, ?,?,?,?,?)";

  try {
    const request = await db.runAsync(sql, [firstname,familyname,email, hashedPassword,insrole,specialization,photo,phone]);
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user", detailedError: error.message });

  }
});

module.exports = router;
