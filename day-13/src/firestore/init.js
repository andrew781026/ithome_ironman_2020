const admin = require('firebase-admin');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    projectId:'ezoom-test',
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ezoom-test.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;