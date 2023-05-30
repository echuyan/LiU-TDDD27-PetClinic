const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/Homepage", async (req, res) => {
  user = req.body;
});

module.exports = router;
