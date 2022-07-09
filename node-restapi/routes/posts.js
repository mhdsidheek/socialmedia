 
 const router =require("express").Router()
const { json } = require("express");
 const Post =require("../models/Post");
const User = require("../models/User");

// create a post

router.post("/",async(req,res)=>{
   newpost =new Post(req.body)
   try{
      savedPost= await newpost.save();
      res.status(200).json("your post is added")

   }catch(err){
      res.status(500).json(err)
   }
})

// update a post
 router.put("/:id",async(req,res)=>{
   try{
   const post = await Post.findById(req.params.id)
   console.log(post);
      if(post.userId === req.body.userId){
         await post.updateOne({$set:req.body});
         res.status(200).json("youre post has been updated")


      }else{
         return res.status(403).json("you can only update youre posts")
      }

   }catch(err){
      res.status(500).json(err)
   }
 })

// delete apost

router.delete("/:id",async(req,res)=>{
   try{
     const post =await Post.findById(req.params.id)
   if(post.userId === req.body.userId){
      await post.deleteOne();
      res.status(200).json("your post deleted successfully")


   }else{
      return res.status(403).json(" you can delete your  post only ")
   }

   }catch(err){
      res.status(500).json(err)
   }
})

// like a post
router.put("/:id/like",async(req,res)=>{
   try{
      const post =await Post.findById(req.params.id);
      if(!post.likes.includes(req.body.userId)){
         await post.updateOne({$push:{likes:req.body.userId}})
         res.status(200).json("you has been liked this")
      }else {
         await post.updateOne({$pull:{likes:req.body.userId}});
         res.status(200).json("you has been unliked")
      }

   }catch(err){
        res.status(500).json(err)
   }
})
// get a post
router.get("/:id",async(req,res)=>{
   try{

      const post = await Post.findById(req.params.id)
      res.status(200).json(post)
      
   }catch(err){
      res.status(500).json(err)
   }
})
// get timeline
router.get("/timeline/:userId",async(req,res)=>{
   try{
   const currentUser= await User.findById(req.params.userId);
   const userposts = await Post.find({userId :currentUser._id})
   const friendsposts = await Promise.all(
      currentUser.followings.map((frdId)=>{
         return Post.find({userId:frdId})
      })
   )
   res.status(200).json(userposts.concat(friendsposts))
   }catch(err){
      res.status(500).json(err)

   }

})


  module.exports = router