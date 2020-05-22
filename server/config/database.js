const firebase = require('firebase-admin')
const serviceAccount = require("./serviceAccountKey.json");

//init firebaseDB
const fireApp = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://illumi-176f9.firebaseio.com"
});

console.log('Connected to Firebase')

exports.db = fireApp.firestore();
exports.auth = fireApp.auth();

/*firebase.auth().createUser({
    email: 'test@gmail.com',
    password: 'sadsadsad',
    displayName: 'test',
})*/