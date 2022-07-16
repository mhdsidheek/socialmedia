const jwt = require('jsonwebtoken') 
 const generateToken=(userid)=>{
    return jwt.sign({userid},process.env.JWT_SECRET,{
        
    })
}

const verifytoken= (req,res,next) =>{
 const token =req.headers['auth']
 if(!token){
   return res.status(403).send("access Denined")
 }else{

     try{
         console.log("dgd");
         const verified=jwt.verify(token,process.env.JWT_SECRET)
         next()
        }catch(err){
            res.status(400).send("invalid token")
        }
        
    }
}
module.exports ={generateToken,verifytoken}