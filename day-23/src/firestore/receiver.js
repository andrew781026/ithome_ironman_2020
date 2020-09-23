const db = require('./init');
const EventEmitter = require('events').EventEmitter;

const ObserveUtils = {

    /**
     * 回傳一個聊天室的 observer
     *
     * below are event on the observer , use .on( 'event' , data ) to handle it
     *
     * - new-message : trigger when an user send new message
     * - update-message : trigger when an user change a message , it have sent
     * - delete-message : trigger when an user delete a message , it have sent
     *
     * @param roomId
     * @returns {module:events.EventEmitter.EventEmitter}
     */
    observeRoom: roomId => {

        let initState = true;
        setTimeout(() => initState = false, 2000); // 2 秒內的 added 資訊 , 視為初始化 message

        const emitter = new EventEmitter();

        // 監聽 chat 的變化 => /chatroom/${roomId}/message 中的聊天訊息串
        const collect = db.collection('chatroom').doc(roomId).collection('message');

        const observer = collect.onSnapshot(docSnapshot => {

            docSnapshot.docChanges().forEach(change => {
                if (initState && change.type === 'added') emitter.emit('init-message', change.doc.data());
                if (!initState && change.type === 'added') emitter.emit('new-message', change.doc.data());
                if (change.type === 'modified') emitter.emit('update-message', change.doc.data());
                if (change.type === 'removed') emitter.emit('delete-message', change.doc.data());
            });

        }, err => emitter.emit('error', err));

        emitter.getCollect = () => collect;
        emitter.getObserver = () => observer;
        emitter.end = () => emitter.emit('end');

        emitter.on('end', () => {

            // Stop listening for changes
            observer();

            // removeAllListeners on emitter
            // emitter.removeAllListeners();
        });

        return emitter;
    },
}

module.exports = ObserveUtils;