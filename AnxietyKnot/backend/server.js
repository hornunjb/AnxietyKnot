// this is the sever we created by node.js

// imports
// importing our express app
const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

/* makes sure when we try to setup a port or recieve it through a variable, we make sure
  it's a valid number */
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// checks and logs which error is occuring and exits the server
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// log that we are now listening to incoming requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// setting port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// creating server and listeners
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);



