// express app (node.js app taking advtange of express framework)
// tool we want to use for creating routes
const express = require('express');


// parses incoming request bodies and extracts the stream of data
const bodyParser = require('body-parser');


// imports our Post model from our mongoose blueprint
////////////// const Post = require('./models/post')

// imports our Entry model from our mongoose blueprint
//const Entry = require('./models/entry')

//const Post = require('./models/post')




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
app.use(bodyParser.urlencoded({extended: false}));

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



// export our express app along with its middlewares
module.exports = app;
