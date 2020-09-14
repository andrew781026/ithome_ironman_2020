const firebase = require('firebase');

const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp(serviceAccount);

const db = firebase.firestore();

module.exports = db;