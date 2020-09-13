const db = require('./init');

const SenderUtils = {

    sendMessage: async (roomId, message) => {

        const chatRef = db.collection('chatroom').doc(roomId).collection('message');
        return await chatRef.add(message);
    },
}

module.exports = SenderUtils;