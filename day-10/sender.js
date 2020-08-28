const db = require('./firestore');

const chatRef = db.collection('chat');

const sendOneMessage = async () => {

    await chatRef.doc('bob').set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 3900000
    });
};

sendOneMessage().catch(err => console.error(err));