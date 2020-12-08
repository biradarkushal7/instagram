// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyB4xI4H0xO2wG533IXk_1LS6n9Fgyr2auc",
     authDomain: "instagram-clone-366d9.firebaseapp.com",
     databaseURL: "https://instagram-clone-366d9.firebaseio.com",
     projectId: "instagram-clone-366d9",
     storageBucket: "instagram-clone-366d9.appspot.com",
     messagingSenderId: "622251505926",
     appId: "1:622251505926:web:019bf8faeaa73d27e70687",
     measurementId: "G-7DY127JLMP"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };