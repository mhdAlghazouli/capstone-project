var express = require('express');
var router = express.Router();
const { Posts, User } = require("../models");

//posts route post
router.post("/", async (req,res,next) => {
  const {image, textContent, userId} = req.body;
  const post = await Posts.create({image: image, textContent: textContent, userId: userId});
  res.json(post);
});
//posts route get
router.get("/", async (req,res,next) => {

  const posts = await Posts.findAll({
    include:[{
      model: User,
      attributes: ["firstName", "lastName", "userName", "email"]
    }],
    order: [["createdAt", "DESC"]]
  })
  console.log(posts)
  
  res.json(posts)
});
//posts route delete
router.delete("/:id", async (req,res,next) => {
  const {id} = req.params;
  const deletedPost = await Posts.destroy({
    where : {
      id: id
    }
  })
  console.log(deletedPost)
  res.json(deletedPost)
  
});

//posts route edit
router.put("/", async (req,res,next) => {
  const { id, image, textContent, userId } = req.body;
  const updatedPost = await Posts.update({
    image: image,
    textContent: textContent
  },{
    where: {
      id: id
    }
  })
  res.json(updatedPost)
})

module.exports = router;