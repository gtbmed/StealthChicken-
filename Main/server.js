const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const physician =require("./models/physician.js");
const clientOAuth2 = require('client-oauth2');
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/Stealth_Chicken';
mongoose.connect(mongoDB, {
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

var exampleUser = new physician({
  category: "Optometry",
  physician: "Jason Conner",
  comment: {
    date: new Date(Date.now()),
    userId: "String",
    content: "Patient is having Eye trouble"
  }
});
// Using the save method in mongoose, we create our example user in the db
exampleUser.save(function(error, doc) {
  // Log any errors
  if (error) {
    console.log(error);
  }
  // Or log the doc
  else {
    console.log(doc);
  }
});


//==================Authentication==============================================
var patientAuth = new ClientOAuth2({ //should we use let? const?
  clientId: 'KGkhhNwb8IkWa9WYH9ibHfLTONzAAdGr',
  clientSecret: '123', //Need to see about best way to add client secret
  accessTokenUri: 'https://sandbox-api.dexcom.com', // https://api.dexcom.com/v1/oauth2/token is used for non sandox
  authorizationUri: 'https://sandbox-api.dexcom.com',
  redirectUri: 'http://example.com/auth/github/callback', //Need to make a redirectUri
  scopes: ['offline_access']
});

// Get the authorization code ?
app.get('/auth/patientAuth', function (req, res) {
  var uri = patientAuth.code.getUri()

  res.redirect(uri)
}))

app.get('/auth/patientAuth/callback', function (req, res) { // Need Help
  patientAuth.code.getToken(req.originalUrl)
    .then(function (user) {
      console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

      // Refresh the current users access token.
      user.refresh().then(function (updatedUser) {
        console.log(updatedUser !== user) //=> true
        console.log(updatedUser.accessToken)
      })

      // Sign API requests on behalf of the current user.
      user.sign({
        method: 'get',
        url: 'http://example.com'
      })

      // We should store the token into a database.
      return res.send(user.accessToken)
    })
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
