# [ Day 18 ] - 動物聊天室(十一) - 聊天訊息通知

今天我想來點 "訊息通知" - Notification

----

我們不太可能盯著 "動物聊天室" 一直看有沒有新訊息 , 因此我們需要

當有新訊息進來時 , 通知我們有新的訊息

## 開始製作 

當有新訊息時 , 新增一個通知

```javascript
// ./ipcmains/notify.js
import {ipcMain, BrowserWindow, Notification,} from 'electron';

// 新訊息進入
ipcMain.on('notify:new-msg', (event, chat) => {

    const mainWindow = BrowserWindow.fromWebContents(event.sender); // 利用 event.sender 取得 currentWindow
    const isFocused = mainWindow.isFocused(); // 確認 mainWindow 是否在最上面

    const myNotification = new Notification({
        title: `${chat.name}有新的對話`,
        subtitle: chat.msg
    });

    myNotification.on('click', () => mainWindow.show()); // 將 mainWindow 帶到最上面
    myNotification.on('close', () => mainWindow.show()); // 將 mainWindow 帶到最上面
    myNotification.show();

    if (!isFocused) {

        // 工作列按鈕閃爍
        mainWindow.flashFrame(true);
    }
});
```

在 `Chatroom.vue` 上的 firestoreUtils.observer 修改 new-message 事件的行為

```diff
.on('new-message', msg => {
    this.chats.push(msg);
+   window.ipcRenderer.send('notify:new-msg', msg); // 送訊息給 Main Process , 告知有新的聊天訊息
})
```

### 未讀訊息數量 ![](https://i.imgur.com/Z3ANju5.png)

> 如果我們想要像 Line 一樣 , 顯示 n 則訊息未讀 , 可以使用 `electron-windows-badge` 來製作 n 則未讀的圖示



在  ./ipcmains/notify.js 中使用 `electron-windows-badge`


```javascript
// ./ipcmains/notify.js

// 新訊息進入
ipcMain.on('notify:new-msg', (event, chat) => {

    // notify:new-msg 事件內容 
});

// 使用 electron-windows-badge 的部分加在 notify:new-msg 事件之後

import Badge from 'electron-windows-badge';

const _map = {};

export const fromWinId = winId => _map[winId];

// badge manager
export class BadgeManager {

    constructor(win) {

        const badgeOptions = {};
        new Badge(win, badgeOptions);
        this.badgeCount = null;
        this.winId = win.id;
        _map[win.id] = this;
    }

    fromWinId(winId) {

        return _map[winId];
    }

    updateNumber() {

        BrowserWindow.fromId(this.winId).webContents.send('update-badge', this.badgeCount);
    }

    removeNumber() {

        this.badgeCount = null;
        this.updateNumber();
    }

    setNumber(number) {

        this.badgeCount = number;
        this.updateNumber();
    }

    increaseNumber() {

        if (this.badgeCount) this.badgeCount++;
        else this.badgeCount = 1;
        this.updateNumber();
    }

    getBadgeCount() {

        return this.badgeCount;
    }
}
```

在 `background.js` 中使用 BadgeManager

```javascript
import {BadgeManager} from './ipcmains/notify';

// 下方程式碼放入 createWindow 函式中
const badgeManager = new BadgeManager(win);
win.on('focus', () => badgeManager.removeNumber()); // 移除 badge
```

由於 `electron-windows-badge` 更新 badge 數字
要用到 `ipcRenderer.sendSync('update-badge', number)` , 
因此別忘了在 `preload.js` 多加 ipcRenderer.sendSync('update-badge' 的設定

```diff
const {ipcRenderer} = require('electron');
window.ipcRenderer = ipcRenderer;

+ ipcRenderer.on('update-badge', (event, number) => ipcRenderer.sendSync('update-badge', number));
```

當你成功追加 Notification 與 electron-windows-badge 後 , 你可以得到下方成果

![](https://i.imgur.com/ddtnUtP.gif)

### 測試用程式

你可以利用下方 sender 測試新訊息追加時 , Notification 與 badge 是否呈現預期效果

```javascript
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
```

## 參考資料

- [electron 官方文件 - Notification](https://www.electronjs.org/docs/tutorial/notifications)
- [electron-windows-badge](https://www.npmjs.com/package/electron-windows-badge)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
