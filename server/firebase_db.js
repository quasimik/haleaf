// Set configuration for app
// TODO: APIKEY, PROJECT ID, and BUCKET need to be filled in appropriately

var config = {
  apiKey: "AIzaSyD3Q30xVLb5FtoHu-YKzgv4bT0QetpWuuc ",
  authDomain: "haleaf-d11de.firebaseapp.com",
  databaseURL: "https://haleaf-d11de.firebaseio.com"
  storageBucket: "BUCKET.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to database service
var database = firebase.database();

// Function to save a new user's data to database. Currently accepts a limited amount of data, edit to extend
function writeData(token, user_data_json) {
  database.ref('users/' + token).set({
    data: user_data_json
  });
}

// Get Snapshots
// (at start) once('value').then(function(snapshot) {...});
// (periodically) on('value', function(snapshot) {...});

// Function to save an existing user's data to database. Currently accepts a limited amount of data, edit to extend
function updateData(token, user_data_json) {
  var updates = {};
  updates['users/' + token] = { data: user_data_json };
  
  database.ref().update(updates);
}


