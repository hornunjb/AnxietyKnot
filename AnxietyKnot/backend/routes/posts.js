const express = require("express");

const router = express.Router();
const Post = require("../models/post");

//MIDDLEWARE TO CHECK AUTHORIZATION OF INCOMING AND OUTGOING JSONWEBTOKEN REQUESTS
const checkAuth = require("../middleware/check-auth");

router.post(
  "",
  checkAuth,
  (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      creator: req.userData.userId
    });
    /// TEST TO GET EMAIL AND USERID FROM SERVER
    //console.log(req.userData);
   // return res.status(201).json({});

    post
      .save().then(createdPost => {
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
    .catch(error => {
      res.status(500).json({
        message: "Failed To Create Post!"
      });
    });
}
);


  /// OVERLOOKS POST EDITING
router.put(
  "/:id",
  checkAuth,
  (req, res, next) =>
   { const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
    });
  Post.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    post
    ).then(result => {
    console.log(result);
    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't udpate post!"
    });
  });
}
);


// handle incoming get requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
router.get("",(req, res, next) => {
  const postQuery = Post.find();
    let fetchedPosts;
    postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Could Not Fetch Posts!"
      });
  });
});

//INCOMING REQUESTS FOR /:id
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Could Not Fetch Post!"
    });
});
});


// handle incoming delete requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
// adding a ':' allows us to have a dynamic path segment, that we name id
router.delete("/:id", checkAuth, (req, res, next) => {
  // for delete requests, we send the id as part of the url, we don't send the body
  // req.params gives us access to our encoded parameters (id)
  // mongoose's 'deleteOne' allows us to specify which entry we want to delete
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
       console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Could Not Fetch Posts!"
    });
});
});


module.exports = router;
