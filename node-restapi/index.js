const express =require("express");
const app =express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const helmet =require("helmet");
const morgan =require("morgan")
const userRoute =require("./routes/user") 
const authRoute =require("./routes/auth")
const postsRoute =require("./routes/posts")
require('dotenv').config();
const  multer =require('multer');
const path = require("path");


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true},()=>{
 console.log("Connect to MongoDB");
});

app.use("/images", express.static(path.join(__dirname,"public/images")))

// .....middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
      cb(null,req.body.name);
      console.log("req.body",req.body);
    }
  })
  
  const upload = multer({storage});
  app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
      return res.status(200).json("File uploaded successfully")
    }catch(err){
      console.log("err",err);
    }
  })

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postsRoute);




app.listen(4000,()=>{
    console.log("Backend is runnig...!");
})