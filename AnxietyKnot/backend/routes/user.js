const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
//bcrypt offers encryption functionalities that can be used in NodeJS
//activate via "npm install --save bcrypt", used in Nodejs


const router = express.Router();


/// HANDLE INCOMING CREATE USER REQUESTS
router.post("/signup", (req, res, _next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
      .then(_result => {
        res.status(201).json({
          message: "User Account Created.",
          // comment out to prevent signup info appearing in browser console
          //result: result
        });
      })
      .catch(_err => {
        //console.log(err);
        res.status(500).json({
          message: "Authentication Error: This Account Is Already In Use."
        });
      });
  });
});


/// USER LOGIN
router.post("/login",(req, res, _next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed: This Account Does Not Exist."
        });
      }
      // user with email address found
      // compare password user entered in login with password stored in DB without decryption
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    //result of bcrypt.compare for user password
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Authentication Error: Incorrect Password."
        });
      }

      /// TOKEN FOR USER IS CREATED HERE//////////////
    const token = jwt.sign ////JWT = email and userID, .sign = server signature
      ({ email: fetchedUser.email, userId: fetchedUser._id },
        //SERVER SIGNATURE
        "keep_this_secret",
        //USER LOGGED OUT AFTER 1 HR
        { expiresIn: "1h",
     algorithm: 'HS512'
    }
        // sends token to frontend at this point
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600, //EXPIRES IN 3600 SECONDS
        userId: fetchedUser._id // PASSES USERID TO FRONTEND DURING LOGIN
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Authentication Error: User Credentials Are Invalid."
      });
    });
});


module.exports = router;
