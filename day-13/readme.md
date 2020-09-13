# [ Day 13 ] - 動物聊天室(五) - 聊天室資料與 firestore 

今天我們要開始將 firestore 與聊天室畫面接上關係 ,  
利用 IPC 處理 Main Process 與 BrowserWindow 處理資料交換

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
- [DongGuaLemon - f2e7week](https://github.com/DongGuaLemon/f2e7week)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```