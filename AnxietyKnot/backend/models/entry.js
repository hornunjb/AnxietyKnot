

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
  emotion2: { type: String, required: false},
  intensity2: {type: Number, required: true},

  thought_patterns: {type: Array, required: false},
  custom_thought_patterns: { type: String, required: false},
  thinking_differently: { type: String, required: true},

 creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});



module.exports = mongoose.model('Entry', entrySchema);





