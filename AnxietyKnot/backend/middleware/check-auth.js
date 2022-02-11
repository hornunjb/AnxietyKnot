/*TO EXTRACT ANY FILES THAT ARE PART OF THE INCOMING REQUEST TO CHECK IF USER IS AUTHENTICATED OR NOT
 PARSE REQUESTS TO DETERMINE IF REQ BE ALLOWED OR DENIED
 CHECK/VERIFY OUTGOING AND INCOMING AUTHENTICATION WITH HELP OF JSONWEBTOKEN
 FUNCTION EXE ON INCOMING REQUEST AND RUNS BEFORE ANY FINAL FUNCTIONS
DO NOT ADD MIDDLEWARE IN /routes/user.js, set it in posts.js */

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // accepts token from header of request
    /// ("") is bearer word
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "keep_this_secret");

    /// REQUESTED USERDATA WILL HAVE THEIR EMAIL AND USERID DECODED VIA JWT
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You Are Not Authenticated!" });
  }
};


