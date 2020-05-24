const firebase = require('firebase-admin')
const fireapp = require('firebase')

const serviceAccount = require("./serviceAccountKey.json");
const firebaseConfig = require("./firebaseConfig.json");

//init firebase-admin
const dbAdmin = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://illumi-176f9.firebaseio.com"
});

//init firebase-auth
const dbAuth= fireapp.initializeApp(firebaseConfig, 'auth')

console.log('Connected to Firebase')

exports.db = dbAdmin.firestore();
exports.admin = dbAdmin.auth();
exports.auth = dbAuth.auth();