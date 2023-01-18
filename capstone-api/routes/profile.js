var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.post("/", async (req,res,next) => {
  
  const { token } = req.body;
  console.log("this is token", token)
  try {
    const user = jwt.verify(token, "moe's secret");
    const userId = user.id;
    User.findByPk(userId)
    .then(data => {
      console.log("dataaaaaa:", data)
      res.send({ status: "ok", data: data})
    })
    .catch(error => {
      res.send({ status: "error", data: error})
    })
  } catch (error) {
    console.log(error)
  }
});



//get profile
router.get("/:id", async (req,res,next) => {
  const { id } = req.params
  const oneUser = await User.findByPk(id);
  res.json({oneUser, id:id})
})

module.exports = router;