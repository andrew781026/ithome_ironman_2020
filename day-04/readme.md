# 第四天 - 股票查價(三) - ipcMain . ipcRender 介紹

由於 electron 中有 chromium 端與 node.js 端 , 這兩者需要一種特殊的方式做溝通

那就是 ipcMain & ipcRender 

ipcMain.on 可以接收由 BrowserWindow 中的 ipcRenderer.send 所傳送的資訊 , 但不會回傳任何資訊 , 
如果需要回傳任何訊息給 BrowserWindow 需要使用 event.reply 並加上 ipcRenderer.on 接收回傳訊息
或是改用 ipcRenderer.sendSync 等待 ipcMain.on 回傳 event.returnValue 資訊 (不建議使用)

ipcMain.handle 


```javascript
// 在主處理序裡。
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// 在主處理序裡。
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// 在畫面轉譯處理序中 (網頁)。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // 印出 "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## 參考資料

https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/648629/

- [官方文件 ipc-main](https://www.electronjs.org/docs/api/ipc-main)
- [electron-titlebar](https://www.npmjs.com/package/electron-titlebar)
- [custom-electron-titlebar](https://www.npmjs.com/package/custom-electron-titlebar)