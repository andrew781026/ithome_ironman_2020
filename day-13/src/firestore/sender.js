const db = require('./init');

// _uuid() 的參考資料 : https://cythilya.github.io/2017/03/12/uuid/
function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const SenderUtils = {

    addMessage: async (roomId, message = {}) => {

        const uuid = _uuid();
        const chatRef = db.collection('chatroom').doc(roomId).collection('message');
        return await chatRef.doc(uuid).set({...message, uuid, create_at: new Date()});
    },
    addMessages: async (roomId, messages = []) => {

        return await Promise.all(messages.map(msg => SenderUtils.addMessage(roomId, msg)));
    },
    updateMessage: async (roomId, message = {}) => {

        const uuid = message.uuid;
        const chatRef = db.collection('chatroom').doc(roomId).collection('message');
        return await chatRef.doc(uuid).update(message);
    },
    deleteMessage: async (roomId, uuid) => {

        const chatRef = db.collection('chatroom').doc(roomId).collection('message');
        return await chatRef.doc(uuid).delete();
    },
}

module.exports = SenderUtils;