var express = require('express');
var router = express.Router();
const { Posts, User, Likes, Comments } = require("../models");

//post comment route
router.post("/", async (req, res, next) => {
  const {commentText, userId, postId} = req.body;
  const comment = await Comments.create({commentText: commentText, userId: userId, postId: postId})
  res.json(comment)
})

module.exports = router;