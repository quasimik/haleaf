import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD3Q30xVLb5FtoHu-YKzgv4bT0QetpWuuc",
  authDomain: "haleaf-d11de.firebaseapp.com",
  databaseURL: "https://haleaf-d11de.firebaseio.com",
  projectId: "haleaf-d11de",
  storageBucket: "haleaf-d11de.appspot.com",
  messagingSenderId: "105787794878"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.database();
export default firebase;