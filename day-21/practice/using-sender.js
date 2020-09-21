const firestoreUtils = require('../src/firestore/firestoreUtils');

const message = {
    name: '他',
    team: 'left',
    avatar: 'dog-3.png',
    msg: '這是新的訊息',
    create_at: new Date()
}

firestoreUtils.sender
    .addMessage('init-room', message)
    .catch(e => console.error(e));
