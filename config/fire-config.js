import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDPyrfVbqOh4z91jp0rnKRk_5Q45yYPDYU",
    authDomain: "shopfiin-a5d36.firebaseapp.com",
    databaseURL: "YOUR DATABASE URL",
    projectId: "shopfiin-a5d36",
    storageBucket: "shopfiin-a5d36.appspot.com",
    messagingSenderId: "772454685083",
    appId: "1:772454685083:web:df727fa18fc6f1a97f293e"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;