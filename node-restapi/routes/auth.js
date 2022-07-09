const router =require("express").Router();
const User =require("../models/User")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const JWT_SECRET="ggvxg"


// register 
router.post("/register",async(req,res)=>{
    try{
        // generate password
        const salt =await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(req.body.password, salt) ;
        
        // create new user
    const newUser= new User({
        username: req.body.username,
        email:   req.body.email,
        password: hashPassword,
    });
    // save user
      const user =await newUser.save();
        res.status(200).json(user)
    }catch(err){
           console.log(err);
    }
    
});

//  Login
router.post("/login",async(req,res)=>{
    console.log("login", req.body);
   
    const user =await User.findOne({email:req.body.email});
   
    if(user&& await bcrypt.compare(req.body.password,user.password)){
        const token =jwt.sign({id:user._id},JWT_SECRET)
        console.log("token",token);
        console.log("us",user._id);
        res.status(200).json({user,token})
    }
    else{
      res.status(400).json("invalid  email or password")
    }
})
   
    
            
      
   
   
       
    
    
   
// catch(err){
//     console.log("sgvd",err);
//         res.status(500).json(err)
        
//     }
// })




module.exports =router