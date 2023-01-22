var express = require('express');
var router = express.Router();
const { Posts, User, Likes } = require("../models");

//posts route post
router.post("/", async (req,res,next) => {
  const {image, textContent, userId} = req.body;
  const post = await Posts.create({image: image, textContent: textContent, userId: userId });
  res.json(post);
});
//posts route get
router.get("/:id", async (req,res,next) => {
  const { id } = req.params

  const posts = await Posts.findAll({
    where: {
      userId: id
    },

    include:[{
      model: User,
      attributes: ["firstName", "lastName", "userName", "email"]
    },
    {
      model: Likes,
      attributes:["userId","postId"]
    }
  ],
    order: [["createdAt", "DESC"]]
  })
  console.log(posts)
  
  res.json(posts)
});
//posts route delete
router.delete("/:id", async (req,res,next) => {
  try {
    const { id } = req.params;
    await Likes.destroy({
        where: {
            postId: id
        }
    });
    await Posts.destroy({ where: { id } });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
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