// Set configuration for app
// TODO: APIKEY, PROJECT ID, and BUCKET need to be filled in appropriately

var config = {
  apiKey: "APIKEY",
  authDomain: "PROJECTID.firebaseapp.com",
  databaseURL: "https://halefuldb.firebaseio.com"
  storageBucket: "BUCKET.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to database service
var database = firebase.database();

// Function to save a new user's data to database. Currently accepts a limited amount of data, edit to extend
function writeData(name, weight, height, diseases) {
  database.ref('users/' + name).set({
    username: name,
    weight: weight,
    height: height,
    diseases: diseases
  });
}

// Get Snapshots
// (at start) once('value').then(function(snapshot) {...});
// (periodically) on('value', function(snapshot) {...});

// Function to save an existing user's data to database. Currently accepts a limited amount of data, edit to extend
function updateData(name, weight, height, diseases) {
  var updates = {};
  updates['users/' + name] = { username: name, weight: weight, height: height, diseases: diseases };
  
  database.ref().update(updates);
}

// Function to remove an existing user's disease
function removeData(name, removed_diseases) {
  var updates = {};
  for (i = 0; i < cars.length; i++) {
    database.ref('users/diseases/' + removed_diseases[i]).update(null);
  }
}

