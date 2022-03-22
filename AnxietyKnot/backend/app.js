// express app (node.js app taking advtange of express framework)
// tool we want to use for creating routes
const express = require('express');


// parses incoming request bodies and extracts the stream of data
const bodyParser = require('body-parser');


// imports our Post model from our mongoose blueprint
////////////// const Post = require('./models/post')

// imports our Entry model from our mongoose blueprint
const Entry = require('./models/entry')

const Post = require('./models/post')




// we are using mongoose instead of mongodb's drivers to connect and interact with our database
// mongoose also uses schemas, that will allow us to store structured data and fetch it easily
const mongoose = require('mongoose');


///NODEMON WILL CRASH IF THESE ARE REMOVED
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const entriesRoutes = require("./routes/entries");

const app = express();

// connecting our app to our mongodb database using my credentials
// Connecting Local DB: have Mongo atlas password in Nodemon.json file or manually enter in 'mongoose.connect' below
mongoose.connect(
  "mongodb+srv://hornunjb:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.ltjdk.mongodb.net/AnxietyKnot"
  )
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});


/// DELETING WILL DISCONNECT HTTP://LOCALHOST:3000/API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* 'use' uses middleware on incoming request - takes a function that takes a request and response
  along with 'next' which allows a request to continue its journey if you are using the response
  for somewhere else - without 'next' the request will not reach any other middlewares */

// since our hosts are on different ports and want to communicate we need to set headers to avoid a CORS error
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

/////KEEP
app.use("/api/user", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/entries", entriesRoutes);
// handle incoming post requests, passing a path argument all requests that target localhost:3000/api/posts will reach this middleware
app.post("/api/entries", (req, res, next) => {
  // using body parser we can access the 'body' field and create a post object that is managed by mongoose
  const entry = new Entry({
    date: req.body.date,
    title: req.body.title,
    what_happened: req.body.what_happened,
    going_through_mind: req.body.going_through_mind,
    emotion1: req.body.emotion1,
    intensity1: req.body.intensity1,
    emotion2: req.body.emotion2,
    intensity2: req.body.intensity2,
    thought_patterns: req.body.thought_patterns,
    custom_thought_patterns: req.body.custom_thought_patterns,
    thinking_differently: req.body.thinking_differently,
  });
  // 'save' method is provided by mongoose for each model created with it
  // mongoose will create the right query and will enter our data into the database
  entry.save().then(createdEntry => {
    // return data in a json format showing it was a sucesss with status code 201
    // also sends back postId field so we can use it in our app
    res.status(201).json({
      message: "Entry added successfully",
      entryId: createdEntry._id
    });
  });
});

app.put("/api/entries/:id", (req, res, next) => {
  const entry = new Entry({
    _id: req.body.id,
    date: req.body.date,
    title: req.body.title,
    what_happened: req.body.what_happened,
    going_through_mind: req.body.going_through_mind,
    emotion1: req.body.emotion1,
    intensity1: req.body.intensity1,
    emotion2: req.body.emotion2,
    intensity2: req.body.intensity2,
    thought_patterns: req.body.thought_patterns,
    custom_thought_patterns: req.body.custom_thought_patterns,
    thinking_differently: req.body.thinking_differently,
  });
  Entry.updateOne({_id: req.params.id}, entry).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful!'});
  });
});

// handle incoming get requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
app.get('/api/entries',(req, res, next) => {
  // mongoose's 'find' method will return all entries in our specified collection
  Entry.find().then(documents => {
    // return data in a json format showing it was a sucesss with status code 200
    res.status(200).json({
      message: 'Entries fetched successfully!',
      entries: documents
    });
  });
});



// handle incoming delete requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
// adding a ':' allows us to have a dynamic path segment, that we name id
app.delete("/api/entries/:id", (req, res, next) => {
  // for delete requests, we send the id as part of the url, we don't send the body
  // req.params gives us access to our encoded parameters (id)
  // mongoose's 'deleteOne' allows us to specify which entry we want to delete
  Entry.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Entry deleted!"});
  });
});


//add functions to handle "post" endpoints
// handle incoming post requests, passing a path argument all requests that target localhost:3000/api/posts will reach this middleware
app.post("/api/posts", (req, res, next) => {
  // using body parser we can access the 'body' field and create a post object that is managed by mongoose
  const post = new Post({
    date: req.body.date,
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
    date: req.body.date,
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
