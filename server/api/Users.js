const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

router.use(bodyParser.json()); 

// Fetching all userinfo from database and sending it to
// component
router.get("/Users/Fetch_all_userinfo", async (req, res) => {
  let sql = "SELECT DISTINCT * FROM users";
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
        fileName = `/${file.originalname}`;
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

module.exports = router;
