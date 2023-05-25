const express = require("express");
const router = express.Router();
const db = require("../database");



router.post("/Pets/GetPet", async (req, res) => {
  console.log(req);
  const id = req.body.petId;
  console.log(id);
  const sql = "SELECT * FROM pets WHERE id = ?";
  const getPet = await db.getAsync(sql, id);

  if (getPet === undefined) {
    
    res.json({
        message: "No such pet",
    });
  } else {
    res.json({
       user: getPet, 
    });
      }

  });

    

module.exports = router;
