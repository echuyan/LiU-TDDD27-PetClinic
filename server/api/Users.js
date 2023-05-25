const express = require("express");
const router = express.Router();
const db = require("../database");


// Fetching all userinfo from database and sending it to
// component
router.get("/Users/Fetch_all_userinfo", async (req, res) => {
  let sql = "SELECT DISTINCT * FROM users";
  let database = await db.allAsync(sql);
  return res.json(database);
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

module.exports = router;
