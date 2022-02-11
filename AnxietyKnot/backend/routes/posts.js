const express = require("express");
const PostController = require("../controllers/posts");

//MIDDLEWARE TO CHECK AUTHORIZATION OF INCOMING AND OUTGOING JSONWEBTOKEN REQUESTS
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


////EXPORTS POSTS.JS LOGIC REQUESTS TO /controllers/posts.js
router.post("", checkAuth, PostController.createPost);

router.put("/:id", checkAuth, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);


// handle incoming delete requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
// adding a ':' allows us to have a dynamic path segment, that we name id


module.exports = router;
