const express = require("express");
const Post = require("../models/post");
//MIDDLEWARE TO CHECK AUTHORIZATION OF INCOMING AND OUTGOING JSONWEBTOKEN REQUESTS
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


////EXPORTS POSTS.JS LOGIC REQUESTS TO /controllers/posts.js

/// CREATE POST
router.post("", checkAuth, (req, res, _next) =>
{ const post = new Post({
  title: req.body.title,
  content: req.body.content,
  creator: req.userData.userId
});
/// UNCOMMENT CONSOLE.LOG TO GET EMAIL AND USERID FROM SERVER
//console.log(req.userData);
post.save().then(createdPost => {
  // return data in a json format showing it was a sucesss with status code 201
  // also sends back postId field so we can use it in our app
  res.status(201).json({
    message: "Post Added Successfully!",
    post: {
      ...createdPost,
      id: createdPost._id
    }
  });
})
  /* -----TECH ERROR PROMPT ----*/
.catch(_error => {
  res.status(500).json({
    message: "Technical Error: Failed To Create Post!"
    });
  });
});

/// UPDATE POST
router.put("/:id", checkAuth, (req, res, _next) =>
{ const post = new Post({
 _id: req.body.id,
 title: req.body.title,
 content: req.body.content,
 creator: req.userData.userId
 });
 Post.updateOne(
   { _id: req.params.id, creator: req.userData.userId },
   post
   ).then(result =>
     {
      console.log(result);
    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Post Update Successful!" });
    } else {
      res.status(401).json({ message: "You Are Not Authorized To Update This Post!" });
    }
  }) /* -----TECH ERROR PROMPT ----*/
    .catch(_error => {
    res.status(500).json({
      message: "Technical Error: Post Update Was Not Successful!"
      });
    });
  });

// KEEP MANDATORY ! GET ALL POSTS
/// FETCHES POSTS FROM DB AND IS DISPLAYED IN http://localhost:3000/api/posts

router.get("", (_req, res, _next) => {
  const postQuery = Post.find();
    let fetchedPosts;
    postQuery.then(documents =>
      {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        //MESSAGE ONLY DISPLAYS IN http://localhost:3000/api/posts
        message: "Posts Fetched Successfully!",

        posts: fetchedPosts,
        maxPosts: count

      });
    })
      /* -----TECH ERROR PROMPT ----*/
    .catch(_error => {
      res.status(500).json({
        message: "Technical Error: Could Not Fetch Posts!"
      });
    });
});



/// GET POST ID FROM POSTS// IS THIS OPTIONAL?
router.get("/:id", (req, res, _next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post Not Found!" });
    }
  })
    /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Technical Error: Could Not Fetch Post!"
    });
  });
});

router.delete("/:id", checkAuth, (req, res, _next) => {
  // mongoose's 'deleteOne' allows us to specify which entry we want to delete
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
       console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Post Deletion Successful!" });
    } else {
      res.status(401).json({ message: "You're Not Authorized To Delete This Post!" });
    }
  }) /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Technical Error: Could Not Delete Post!"
    });
  });
});

module.exports = router;
