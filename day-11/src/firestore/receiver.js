const db = require('./firestore');

// 監聽 chat 的變化
const doc = db.collection('chatroom').doc('room-1').collection('message');

// 監聽各自不同的 chatroom 新增 . 刪除 . 修改的實時訊息
const observer = doc.onSnapshot(docSnapshot => {

    docSnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            console.log('New chat: ', change.doc.data());
        }
        if (change.type === 'modified') {
            console.log('Modified chat: ', change.doc.data());
        }
        if (change.type === 'removed') {
            console.log('Removed chat: ', change.doc.data());
        }
    });

}, err => {
    console.log(`Encountered error: ${err}`);
});

// Stop listening for changes
// observer();