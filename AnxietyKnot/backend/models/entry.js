// entry model using mongoose - this will act as a bridge from our node and express app to mongodb

//creates a schema
const mongoose = require('mongoose');

// blueprint for our schema - we define the fields and types of data we want to store

//using required:true fopr everything for now, probably change later
const entrySchema = mongoose.Schema({
  // mongoose creates an id on its own
  date: { type: Date, required: true },
  title: { type: String, required: true},
  what_happened: { type: String, required: true},
  going_through_mind: { type: String, required: true},
  emotion1: { type: String, required: true},
  intensity1: {type: Number, required: true},
  emotion2: { type: String, required: true},
  intensity2: {type: Number, required: true},

  thought_patterns: {type: Array, required: true},
  custom_thought_patterns: { type: String, required: true},
  thinking_differently: { type: String, required: true},
});

/* schema is just a blueprint - in order to actually create objects from that definition
we turn it into a model by using this function to use it in our code and export it */
module.exports = mongoose.model('Entry', entrySchema);
