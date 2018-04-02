const functions = require('firebase-functions');
const google = require('googleapis');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const PROJECT_NAME = "haleaf";
const MODEL_NAME = "";

exports.predict = functions.database.ref("/{uid}/vector").onWrite((event) => {
  if(event.data.changed()) {

    const uid = event.params.uid;
    const vector = event.data.val();

    google.auth.getApplicationDefault((err, authClient) => {
      
      if(err) {
        console.error(err);
      }

      // ML Engine does not have its own scope. Needs to use global
      // https://developers.google.com/identity/protocols/googlescopes#mlv1
      if(authClient.createScopedRequired && authClient.createScopedRequired()) {
        authClient = authClient.createScoped(['https://www.googleapis.com/auth/cloud-platform']);
      }

      var ml = google.ml({
        version: 'v1',
        auth: authClient
      });

      // predict( {formatted input object}, callback )
      ml.projects.predict(
        {
          name: `projects/${PROJECT_NAME}/models/${MODEL_NAME}`,
          resource: {
            name: `projects/${PROJECT_NAME}/models/${MODEL_NAME}`,
            instances: [vector]
          }
        },
        (err, result) => {
          if(err){
            console.error('ERROR PREDICT', err)
          }
          if(result.predictions[0]){
            event.data.ref.parent.child("prediction").set(result.predictions[0]);
          }
        }
      );
    });
  }
});