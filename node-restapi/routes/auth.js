const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var {generateToken} = require("./Token");
const { registerUser, loginUser } = require("../controllers/usercontroller");


// register
router.route("/register").post(registerUser)

//  Login
router.route("/login").post(loginUser)

// catch(err){
//     console.log("sgvd",err);
//         res.status(500).json(err)

//     }
// })


module.exports = router;
