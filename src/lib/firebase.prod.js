import Firebase from "firebase/app";

import "firebase/firestore";

import "firebase/auth";

import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyBCBu4xNvtfbWnNrTZa41gP_vvL0wvFS1w",
  authDomain: "arbit-223c4.firebaseapp.com",
  databaseURL: "https://arbit-223c4.firebaseio.com",
  projectId: "arbit-223c4",
  storageBucket: "arbit-223c4.appspot.com",
  messagingSenderId: "33492462019",
  appId: "1:33492462019:web:89ecd2d082121d3afab576",
};

const firebase = Firebase.initializeApp(config);

//seedDatabase(firebase);

export { firebase };
