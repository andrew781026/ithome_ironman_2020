const db = require('./firestore');

const chatRef = db.collection('chat');

const sendOneMessage = async () => {

    await chatRef.doc('John').set({
        name: 'Taipei',
        state: 'TP',
        country: 'TWD',
        capital: false,
        population: 42000
    });
};

sendOneMessage().catch(err => console.error(err));