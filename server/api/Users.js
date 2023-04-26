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

module.exports = router;
