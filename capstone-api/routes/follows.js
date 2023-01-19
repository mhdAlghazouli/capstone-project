var express = require('express');
var router = express.Router();
const { User, Follows, Posts } = require("../models");

//follows post route
router.post("/", async (req, res, next) => {
  const {followerId, followedId} = req.body;
  const follow = await Follows.create({followerId: followerId, followedId: followedId});
  res.json(follow)
});

//follows get route
router.get("/", async (req,res, next) => {

 
   let follows = await Follows.findAll({
      
        include:[
          {
            model: User,
            as: "follower",
            attributes: ["firstName", "lastName", "userName", "email"],
            include: [
              {
                model: Posts,
                attributes: ["id","image","textContent","userId"],
                order: [["createdAt", "DESC"]]
              }
            ]
          },
          {
            model: User,
            as: "followed",
            attributes: ["firstName", "lastName", "userName", "email"],
            include: [
              {
                model: Posts,
                attributes: ["id","image","textContent","userId"],
                order: [["createdAt", "DESC"]]
              }
            ]
          }
        ],
      
      order: [["createdAt", "DESC"]]
      })
      if(follows.length === 0){
         follows = await Posts.findAll()
        
      }
      await res.json(follows)
    })

//unFollow route
router.delete("/:id", async (req,res,next) => {
  const {id} = req.params;
  const unFollow = await Follows.destroy({
    where : {
      id: id
    }
  })
  console.log(unFollow)
  res.json(unFollow)
  
});


module.exports = router;