// post model using mongoose - this will act as a bridge from our node and express app to mongodb

//creates a schema
const mongoose = require('mongoose');


// blueprint for our schema - we define the fields and types of data we want to store
const postSchema = mongoose.Schema({
  // mongoose creates an id on its own
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },

  /// USER AUTHORIZATION
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});



//// CODE TO TEMPORARILY BYPASS POST INVALIDATIONS
//postSchema.set('validateBeforeSave', false);
//postSchema.path('title').validate(function (value) {
  //return value != null;
//});


/* schema is just a blueprint - in order to actually create objects from that definition
we turn it into a model by using this function to use it in our code and export it */
module.exports = mongoose.model('Post', postSchema);
