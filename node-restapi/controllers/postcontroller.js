const Post =require("../models/Post");
const User =require("../models/User");
const { verifytoken } = require("../routes/Token");


// create post
const createPost = async (req, res) => {
    newpost = new Post(req.body);
    try {
   const   savedPost = await newpost.save();
      console.log("tftfff",savedPost);
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  }


// update post 
const updatePost =async (req, res) => {
  console.log(req.body);
    try {
      const post = await Post.findById(req.body.postId);
      console.log("post", post);
       
        await post.updateOne({ $set:{desc: req.body.desc }});
        res.status(200).json("youre post has been updated");
    }catch(err) {
      res.status(500).json(err);
    }
  }

//   delete post

const deletePost = async (req, res) => {

  console.log("delete",req.params.id);
    try {
      const post = await Post.findById(req.params.id);
      console.log("postssss",post);
        await post.deleteOne();
        res.status(200).json("your post deleted successfully");
      
    } catch (err) {
      res.status(500).json(err);
    }
  }

// like a post

const likeApost =async  (req, res) => {
  console.log("like0000000",req.body);
    try {
      const post = await Post.findById(req.params.id);
      console.log("post",post);
      if (!post.likes.includes(req.body.userId)) {
        console.log("includes");
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("you has been liked this");
        
      } else {
        console.log("else");
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("you has been unliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }


//   get a post 

getApost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // write comment
  const comment = async (req,res) =>{
    console.log("qaz",req.body);
     const comment ={
      text :req.body.text,
      username :req.body.username

     }
     Post.findByIdAndUpdate(req.body.postId,{
          $push:{comments:comment}
     },{
      new:true
    })
    .exec((err,result)=>{
      if(err){
        return res.status(422).json({error:err})
      }else{
        res.json(result)
      }
    })
  }
//   get timeline

const getTimeline = async  (req, res) => {
    // console.log("asdf",req.params.userId);

    try {
      const currentUser = await User.findById(req.params.userId);
      const userposts = await Post.find({ userId: currentUser._id });
      const friendsposts = await Promise.all(
        currentUser.followings.map((frdId) => {
            return  Post.find({ userId: frdId });
          
          
        }),
        
      );
      console.log("fri",friendsposts)
      // console.log(userposts, friendsposts, "usser");
      res.status(200).json(userposts.concat(friendsposts));
    } catch (err) {
        console.log("catch",err);
      res.status(500).json(err);
    }
  }




module.exports ={createPost ,updatePost,deletePost,likeApost,getApost,getTimeline,comment}