const db = require('./firestore');

const chatRef = db.collection('chatroom').doc('room-1').collection('message');

const sendOneMessage = async () => {

    await chatRef.add({
        name: "Tokyo",
        country: "Japan"
    })
};

sendOneMessage().catch(err => console.error(err));