const router = require("express").Router();
const { json } = require("express");
const { createPost, updatePost, getTimeline, getApost, likeApost, comment, deletePost } = require("../controllers/postcontroller");
const Post = require("../models/Post");
const User = require("../models/User");
const { verifytoken } = require("./Token");

// create a post

router.route("/").post(createPost)

// update a post
router.route("/updatepost").put(updatePost)

// delete apost

router.route("/delete/:id").delete(deletePost)

// like a post
router.route("/:id/like").put( likeApost);
// comment a post
router.route("/comment").patch(comment)
// get a post
router.route("/:id").get(getApost)
// get timeline
router.route("/timeline/:userId").get(verifytoken, getTimeline)

module.exports = router;
