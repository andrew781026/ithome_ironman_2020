# [ Day 13 ] - 動物聊天室(六) - 聊天室資料與 firestore 

今天我們要開始將 firestore 與聊天室畫面接上關係 ,  
利用 IPC 處理 Main Process 與 BrowserWindow 處理資料交換

在 [day-09](https://ithelp.ithome.com.tw/articles/10235110) 中我們知道 IPC 交換資訊需要
- 在 background.js 中使用 ipcMain.on 建立 chanel 等待訊息與 event.reply 回訊息給 BrowserWindow
- 在 BrowserWindow 中使用 ipcRenderer.on 建立 chanel 等待訊息與 ipcRenderer.send 發訊息給 ipcMain 的特定 chanel

下方我們就用這 2 大重點 , 進行實作 ![/images/emoticon/emoticon58.gif](/images/emoticon/emoticon58.gif)

## 開始實做

接續 [[ Day 10 ] - firestore 介紹](https://ithelp.ithome.com.tw/articles/10235473) 我們整理一下監聽特定房間的行為

預計會有如下的行為

- 初始化 firestore
- 進入特定的聊天室
- 監聽聊天室的談話

> 將初始化的過程包裝成一個 init.js

```javascript
const firebase = require('firebase');

const firebaseConfig = {
    "apiKey": "### FIREBASE API KEY ###",
    "authDomain": "ezoom-test.firebaseapp.com",
    "databaseURL": "https://ezoom-test.firebaseio.com",
    "projectId": "ezoom-test",
    "storageBucket": "ezoom-test.appspot.com",
    "messagingSenderId": "653212361558",
    "appId": "### FIREBASE APP ID ###"
} ;

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = db;
```

> 進入特定的聊天室

```javascript
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
       
        // ...    
    },
}
```

> 監聽聊天室的談話

利用 EventEmitter 做出一個回傳 observer 的 ObserveUtils.observeRoom 函式

```javascript
// in ObserveUtils.observeRoom function 
const emitter = new EventEmitter();

// 監聽 chat 的變化 => /chatroom/${roomId}/message 中的聊天訊息串
const collect = db.collection('chatroom').doc(roomId).collection('message');

const observer = collect.onSnapshot(docSnapshot => {

    docSnapshot.docChanges().forEach(change => {
        if (change.type === 'added') emitter.emit('new-message', change.doc.data());
        if (change.type === 'modified') emitter.emit('update-message', change.doc.data());
        if (change.type === 'removed') emitter.emit('delete-message', change.doc.data());
    });

}, err => emitter.emit('error', err));
```

經過上方三步驟，我們可以包裝出一個 [ObserveUtils](https://github.com/andrew781026/ithome_ironman_2020/blob/master/day-13/src/firestore/receiver.js) 讓監聽某房間的訊息更加容易

監聽可以包裝成 ObserveUtils 那發送訊息也可以整理成 SenderUtils

```javascript
// sender.js
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
```

我們用一個 firestoreUtils 整合一下 observe 跟 sendMessage 行為

```javascript
// firestoreUtils
module.exports = {
    observer: require('./observer'),
    sender: require('./sender'),
};
```

完成 firestoreUtils 代表我們已經包裝了一個 firestore 的工具檔 , 方便之後做使用 , 下方說明在畫面中使用的方式

> 於畫面中使用

在 background.js 中我們需要加上 `start-observe` 與 `add-message` 2 個 ipcMain 的 channel 

```javascript
// in background.js
import firestoreUtils from './firestore/firestoreUtils';

// 開始監聽 chatroom 的訊息
ipcMain.on('start-observe', (event, roomId) => {

    firestoreUtils.observer.observeRoom(roomId)
        .on('new-message', msg => event.reply('new-message', msg))
        .on('update-message', msg => event.reply('update-message', msg))
        .on('delete-message', msg => event.reply('delete-message', msg));
});

// 新增訊息
ipcMain.on('add-message', (event, {roomId, message}) => {

    firestoreUtils.sender.addMessage(roomId, message)
        .catch(e => console.error(e));
});
```

然後 , 在 `Chatroom.vue` 的 `mounted` 中追加 window.ipcMain

```javascript
// in Chatroom.vue
mounted() {

            window.ipcRenderer.on('new-message', (event, msg) => this.chats.push(msg));

            window.ipcRenderer.send('start-observe', 'init-room');
        },
```

當然 , 送出訊息時 , 要用 ipcRenderer 呼叫 add-message 這個 channel 來新增訊息 

```javascript
// in Chatroom.vue
submit() {

    if (this.text) {

        const msg = {
            name: '你',
            team: 'right',
            avatar: 'cat-3.png',
            msg: this.text
        }

        window.ipcRenderer.send('add-message', {roomId: 'init-room', message: msg});

        this.text = ''; // reset input to empty 
    }
}
```

然後我們就可以送訊息給聊天室與接收訊息了 ! 

## 參考資料

- [firestore 官方文件](https://firebase.google.com/docs/firestore/manage-data/add-data)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```