import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyB96_ZUaSKS2rKuIBbAcqAS4MdDBb_VHIw",
  authDomain: "dataroom-cd23c.firebaseapp.com",
  databaseURL: "https://dataroom-cd23c.firebaseio.com",
  projectId: "dataroom-cd23c",
  storageBucket: "dataroom-cd23c.appspot.com",
  messagingSenderId: "500643723201"
};

// var config = {
//   apiKey: "AIzaSyBWDQHJ-oy7HlV4HuJHZPVBuhaLBuumTHM",
//   authDomain: "closingroom-f0b36.firebaseapp.com",
//   databaseURL: "https://closingroom-f0b36.firebaseio.com",
//   projectId: "closingroom-f0b36",
//   storageBucket: "closingroom-f0b36.appspot.com",
//   messagingSenderId: "441765868051"
// };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  db,
  auth,
  storage,
};
