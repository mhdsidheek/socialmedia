const router =require("express").Router();
const bcrypt =require("bcrypt");
const { updateUser, getAuser, deleteAuser, followAuser, unfollowAuser,updatePassword } = require("../controllers/usercontroller");
const { deleteOne } = require("../models/User");
const User = require("../models/User");


// update user

router.route("/updateuser").put(updateUser)

router.route("/updatepassword").put(updatePassword)


// delete user
 router.route("/:id").delete(deleteAuser)
// get a user

router.route("/:id").get(getAuser)
// follow a user 

router.route("/:id/follow").put(followAuser)

// unfollow a user
router.route("/:id/unfollow").put(unfollowAuser)



module.exports =router