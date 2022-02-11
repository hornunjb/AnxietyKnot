const express = require("express");

//bcrypt offers encryption functionalities that can be used in NodeJS
//activate via "npm install --save bcrypt", used in Nodejs
const UserController = require("../controllers/user");

const router = express.Router();



////EXPORTS USER.JS LOGIC REQUESTS TO /controllers/user.js

router.post("/signup", UserController.createUser );

router.post("/login", UserController.userLogin);

module.exports = router;
