const Post = require("../models/post");


 /* -----FILE CONTAINS THE LOGIC FOR /routes/posts.js----*/

exports.createPost = (req, res, _next) =>
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
      message: "Failed To Create Post!"
    });
  });
};

exports.updatePost = (req, res, _next) =>
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
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
  /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Couldn't udpate post!"
    });
  });
};

exports.getPosts = (_req, res, _next) => {
  const postQuery = Post.find();
    let fetchedPosts;
    postQuery.then(documents =>
      {
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
      /* -----TECH ERROR PROMPT ----*/
    .catch(_error => {
      res.status(500).json({
        message: "Could Not Fetch Posts!"
      });
  });
};

exports.getPost = (req, res, _next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
    /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Could Not Fetch Post!"
    });
});
};


exports.deletePost =  (req, res, _next) => {
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
    /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Could Not Delete Posts!"
    });
});
};
