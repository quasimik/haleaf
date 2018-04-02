const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.predict = functions.database.ref("/{uid}/vector").onWrite((event) => {
  if(event.data.changed()) {
    console.log(event.params.uid, "vector changed to", event.data.val());
  }
  return 0;
});