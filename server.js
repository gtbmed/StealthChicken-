// dependencies

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Routes
const routes = require("./routes/API");

// Authorization & security dependencies
const http = require('https');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');

//Mongoose Models
const User = require("./models/physician.js");
const dCase = require("./models/dCase.js");
const Dexcom = require("./models/dexcom.js");
const Comment = require('./models/comment');

// Oauth2 library
const ClientOAuth2 = require('client-oauth2');

// PORT address
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'Stealth_Chicken', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

//Here are the Heroku deploy "Mlab" Mongo URI for the Dexcom Client Secret and the mongo lab
const CLIENT_SECRET = process.env.DEXCOM_CLIENT_SECRET || "";
const MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://localhost/Stealth_Chicken'
// Set up promises with mongoose
mongoose.Promise = global.Promise;
//Set up default mongoose connection
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Once the mongodb is rendered it will console.log successful
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


var testUser = {
    username: 'malcolm',
    password: 'hahahahah',
    email: 'strong.malcolm@y.com',
    specialty: 'cardiologist'
};
// save user to database
Physician.create(testUser)


// app.get("/api/dashboard", function(req, res) {
//   Physician.find({})
//     .exec(function(err, doc) {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         res.send(doc);
//       }
//     });
// });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;
