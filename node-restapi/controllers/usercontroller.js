const User =require("../models/User")
const bcrypt =require("bcrypt")
const { generateToken}= require("../routes/Token")

// register a user

registerUser = async (req, res) => {
    try {
      // generate password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
  
      // create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });
      // save user
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }


//   login user

  loginUser = async (req, res) => {
    // console.log("login", req.body);
  
    const user = await User.findOne({ email: req.body.email });
  
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = generateToken(user._id);
      // console.log("token", token);
      // console.log("us", user._id);
  
      res.status(200).json({ user, token });
    } else {
      res.status(400).json("invalid  email or password");
    }
  }

//   update user
  updateUser = async(req,res)=>{
    if(req.body.userId ===req.params.id ||req.body.isAdmin){
        if(req.body.password){
            try{

                const salt =await bcrypt.genSalt(10)
                req.body.password =await bcrypt.hash(req.body.password ,salt)

            }catch(err){
                return res.status(500).json(err)
            }
        }try{
           const user =await User.findByIdAndUpdate(req.params.id,
            {$set:req.body});
            res.status(200).json("Accont has been updated")
        }catch(err){
            res.status(500).json(err)
        }

    }else{
        return res.status(403).json("you can only update youre acount ")
    }
 
}


// get a user

getAuser =async(req,res)=>{
    try{

      const user=  await User.findById(req.params.id)
      const {password,updatedAt, ...others} =user._doc
        res.status(200).json(others)
    }catch(err){
     res.status(500).json(err)
    }
}


// follow a user

followAuser =async(req,res)=>{
    if(req.body.userId !==req.params.id){
      try{

          const user =await User.findById(req.params.id);
          const currentUser =await User.findById(req.body.userId);
          console.log("abc",currentUser);
          if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push: {followers:req.body.userId}});
            await currentUser.updateOne({$push: {followings:req.params.id}});
            res.status(200).json("now you following this user")

          }else{
            return res.status(403).json("you all ready following this user")
          }
        }catch(err){
            res.status(500).json(err)
        }

    

    }else{
        return res.status(403).json("you can't follow youre self")
    }
}


// unfollow a user
unfollowAuser =async(req,res)=>{

    if(req.body.userId !==req.body.params){
     try{

         const  user =await User.findById(req.params.id)
         const currentUser =await User.findById(req.body.userId)
         if(user.followers.includes(req.body.userId)){
          await user.updateOne({$pull:{followers:req.body.userId}});
          await currentUser.updateOne({$pull :{followings :req.params.id}})
          res.status(200).json("you unfollow this user")
         }else{
             return res.status(403).json("your can only unfollow following users")
         }
     }catch(err){
            
     }

    }else{
     return res.status(403).json("you can't unfollow youre self")
    }
}

deleteAuser =async(req,res)=>{
    if(req.body.userId ===req.params.id || req.body.isAdmin){
        try{

             await User.findByIdAndDelete(req.params.id);
           
            res.status(200).json("your account has been deleted")
        }catch(err){
          
            res.status(500).json(err)

        }


    }else {
        return res.status(403).json("you can delete only your account ")
    }
 }



  module.exports={registerUser,loginUser ,updateUser 
    ,getAuser,followAuser,unfollowAuser,deleteAuser}