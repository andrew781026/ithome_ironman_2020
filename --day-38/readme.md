# 第四天 - 股票查價(三) - ipcMain . ipcRender 介紹

electron 中有 chromium 端與 node.js 端 , 

利用 IPC 傳遞資料 , 畫面端用 ipcRender 與主處理序端的 ipcMain 做溝通

下方為 3 種溝通模式

- 別人來接

由 IpcMain.on 監聽 IpcRenderer.send 傳來的訊息
之後用 event.reply 回傳 
說人話 : 你請別人盯著價格 , 由他來處理後續

![](https://i.imgur.com/hTnFHi4.png)

```javascript
// 在主處理序裡。
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

// 在畫面轉譯處理序中 (網頁)。
const { ipcRenderer } = require('electron')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // 印出 "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')

```

- 等待回應
你一直在盯盤等到價格過低才購買 , 這中間你不做任何事情

![](https://i.imgur.com/2E7ONWb.png)

```javascript
// 在主處理序裡。
const { ipcMain } = require('electron')
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

// 在畫面轉譯處理序中 (網頁)。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
```

- 通知回應
你註冊到價通知 , 到達指定價格時 , 有人會通知你

![](https://i.imgur.com/i8nNnBR.png)

```javascript
// 在主處理序裡。
const { ipcMain } = require('electron')
ipcMain.handle('asynchronous-handle', async (event, arg) => {
  console.log(arg) // prints "ping"
  return 'pong'
})

// 在畫面轉譯處理序中 (網頁)。
const { ipcRenderer } = require('electron')
ipcRenderer.invoke('synchronous-message', 'ping')
           .then(msg => console.log(msg)) // prints "pong"
```


## 參考資料

https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/648629/

- [官方文件 ipc-main](https://www.electronjs.org/docs/api/ipc-main)
- [electron-titlebar](https://www.npmjs.com/package/electron-titlebar)
- [custom-electron-titlebar](https://www.npmjs.com/package/custom-electron-titlebar)