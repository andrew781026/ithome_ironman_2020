const firestoreUtils = require('./firestore/firestoreUtils');

firestoreUtils.observer
    .observeRoom('init-room')
    .on('new-message', msg => console.log(msg))
    .on('update-message', msg => console.log(msg))
    .on('delete-message', msg => console.log(msg));

firestoreUtils.sender.addMessage('init-room', {
    name: '你',
    team: 'right',
    avatar: 'cat-3.png',
    msg:'說唱新世代，超好看！ bilibili 萬歲'
});