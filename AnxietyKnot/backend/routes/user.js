const express = require("express");

//bcrypt offers encryption functionalities that can be used in NodeJS
//activate via "npm install --save bcrypt", used in Nodejs
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
      .then(result => {
        res.status(201).json({
          message: "User Account Created.",
          result: result
        });
      })
      .catch(err => {
        //console.log(err);
        res.status(500).json({
          message: "This Account Is Already In Use."
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "This Account Does Not Exist."
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
          message: "Incorrect Password."
        });
      }
      //creates new token based on object
      // JWT.SIGN ALSO USED TO VERIFY AN INCOMING TOKEN
      const token = jwt.sign
      //// USER ID IS FETCHED FROM TOKEN
      (
        { email: fetchedUser.email, userId: fetchedUser._id },
        //SERVER SIGNATURE
        "keep_this_secret",
        //USER LOGGED OUT AFTER 1 HR
        { expiresIn: "1h" }
        // sends token to frontend at this point
      );
      res.status(200).json({
        // displays token in browser console, DELETE IN FINAL?
        token: token,
        expiresIn: 3600, //EXPIRES IN 3600 SECONDS
        userId: fetchedUser._id // PASSES USERID TO FRONTEND DURING LOGIN
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid Authentication Credentials."
      });
    });
});

module.exports = router;
