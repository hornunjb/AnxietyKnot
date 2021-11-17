// express app (node.js app taking advtange of express framework)
// tool we want to use for creating routes

// imports
const express = require('express');
// parses incoming request bodies and extracts the stream of data
const bodyParser = require('body-parser');
// imports our Post model from our mongoose blueprint
const Post = require('./models/post')
// we are using mongoose instead of mongodb's drivers to connect and interact with our database
// mongoose also uses schemas, that will allow us to store structured data and fetch it easily
const mongoose = require('mongoose');

// creating express app
const app = express();

// connecting our app to our mongodb database using my credentials
mongoose.connect("mongodb+srv://hornunjb:UnOQUPwiXXaCz90a@cluster0.ltjdk.mongodb.net/AnxietyKnot?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

// bodyParser is deprecated, might want to find another solution down the road (still works)
// parses our request body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* 'use' uses middleware on incoming request - takes a function that takes a request and response
  along with 'next' which allows a request to continue its journey if you are using the response
  for somewhere else - without 'next' the request will not reach any other middlewares */

// since our hosts are on different ports and want to communicate we need to set headers to avoid a CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// handle incoming post requests, passing a path argument all requests that target localhost:3000/api/posts will reach this middleware
app.post("/api/posts", (req, res, next) => {
  // using body parser we can access the 'body' field and create a post object that is managed by mongoose
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // 'save' method is provided by mongoose for each model created with it
  // mongoose will create the right query and will enter our data into the database
  post.save().then(createdPost => {
    // return data in a json format showing it was a sucesss with status code 201
    // also sends back postId field so we can use it in our app
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

// handle incoming get requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
app.get('/api/posts',(req, res, next) => {
  // mongoose's 'find' method will return all entries in our specified collection
  Post.find().then(documents => {
    // return data in a json format showing it was a sucesss with status code 200
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

// handle incoming delete requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
// adding a ':' allows us to have a dynamic path segment, that we name id
app.delete("/api/posts/:id", (req, res, next) => {
  // for delete requests, we send the id as part of the url, we don't send the body
  // req.params gives us access to our encoded parameters (id)
  // mongoose's 'deleteOne' allows us to specify which entry we want to delete
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

// export our express app along with its middlewares
module.exports = app;
