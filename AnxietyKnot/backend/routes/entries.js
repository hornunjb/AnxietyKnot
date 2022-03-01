
const express = require("express");
const Entry = require("../models/entry");

/// PROTECT AGAINST UNAUTHENTICATED ACCESS
const checkAuth = require("../middleware/check-authentication");
const router = express.Router();

/// CREATE POST

router.post("", checkAuth, (req, res, _next) => {
  // using body parser we can access the 'body' field and create a post object that is managed by mongoose
  const entry = new Entry
  ({
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
    creator: req.userData.userId
  });
  entry.save().then(createdEntry => {
    res.status(201).json({
      message: "Prompted Entry Added Successfully",
      entryId: { ...createdEntry,
       id: createdEntry._id }
    });
  }) /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Failed To Create Prompted Entry!"
    });
  });
});

/// UPDATE POST

router.put("/:id", checkAuth, (req, res, _next)=> {
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
   creator: req.userData.userId
  });
    Entry.updateOne(
     {_id: req.params.id, creator: req.userData.userId },
      entry
      ).then(result =>
       {
        console.log(result);
        if (result.matchedCount > 0) {
          res.status(200).json({ message: "Prompted Entry Update Successful!" });
         } else {
          res.status(401).json({ message: "You Are Not Authorized To Update This Prompted Entry !" });
         }
         }) /* -----TECH ERROR PROMPT ----*/
        .catch(_error => {
          res.status(500).json({
           message: "Technical Error: Prompted Entry Update Was Not Successful!"
         });
       });
     });


/// MUST KEEP TO SUCCESSFULLY GET 'ENTRIES' FROM BACKEND
/// ALL INFO FOR THIS DISPLAYS IN http://localhost:3000/api/entries
router.get("", (_req, res, _next) => {
  const entryQuery = Entry.find();
    let fetchedEntries;
    entryQuery.then(documents =>
      {
      fetchedEntries = documents;
      return Entry.count();
    })
    .then(count => {
      res.status(200).json({
        /////MESSAGE ONLY DISPLAYS IN http://localhost:3000/api/entries
        message: "Prompted Entry Fetched Successfully!",
        entries: fetchedEntries,
        maxEntries: count,

      });
    })
      /* -----TECH ERROR PROMPT ----*/
    .catch(_error => {
      res.status(500).json({
        message: "Technical Error: Could Not Fetch Prompted Entries!"
      });
    });
});

//// Fetches content from inside entry during edit
router.get("/:id", (req, res, _next) => {
  Entry.findById(req.params.id)
  .then(entry => {
    if (entry) {
      res.status(200).json(entry);
    } else {
      res.status(404).json({ message: "Prompted Entry Not Found!" });
    }
  })
    /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Technical Error: Could Not Fetch Prompted Entry!"
    });
  });
});

///APP.DELETE

router.delete("/:id", checkAuth, (req, res, _next)=> {
  Entry.deleteOne({_id: req.params.id, creator: req.userData.userId })
  .then(result => {
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Prompted Entry Deletion Successful!" });
    } else {
      res.status(401).json({ message: "You Are Not Authorized To Delete!" });
    }
  })
    /* -----TECH ERROR PROMPT ----*/
  .catch(_error => {
    res.status(500).json({
      message: "Technical Error: Could Not Delete Prompted Entry!"
    });
  });
});

module.exports = router;

