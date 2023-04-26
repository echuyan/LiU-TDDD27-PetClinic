const express = require("express");
const router = express.Router();
const db = require("../database");

// Receiving username from component and saving it into variable user
router.post("/Homepage", async (req, res) => {
  user = req.body;
});

module.exports = router;
