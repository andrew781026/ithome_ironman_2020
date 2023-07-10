# Protocol

今天我們來設定 Protocol，讓我們的 App 可以處理 Custom URL Scheme。

![demo](./demo.gif)

### add protocol part

> 追加 Protocol 的權限設定

```javascript
// add beginning of main.js
protocol.registerSchemesAsPrivileged([
    {
        scheme: 'tmcopwin.oidc',
        privileges: {
            standard: true,
            secure: true,
            supportFetchAPI: true ,
            corsEnabled: true,
        }
    }
])
```

> 處理 Protocol 的 request

```javascript
// add beginning of main.js
app.whenReady().then(() => {

    protocol.handle('tmcopwin.oidc', (req) => {
        console.log('protocol.handle ->',req.url) // will trigger when you call tmcopwin.oidc://xxx in BrowserWindow
        return new Response('<h1>hello, world</h1>', {
            headers: { 'content-type': 'text/html' }
        })
    })

    // ...
})
```

---

Q. 近期同事提出了一個疑問 , 為何 win.webContents.session.webRequest.onBeforeSendHeaders 無法接收 test.github.com 傳來的 fetch 指令呢 ?

A. 因為 webRequest 是在 BrowserWindow 上處理 , 也就是在 Chromium 上處理 , 因此無法接收來自不同 site 的 fetch

Q. 那為何使用利用網址列輸入 test://xxx 它可以處理呢 ?

A. 那是因為 test://xxx 等同於在系統上設定遇到 `test://` 開頭的將其交給 Electron 中的 Chromium 來處理

Q. 那我們要如何正確接收來自不同 site 的 fetch ?

A. 使用 protocol.handle 讓 Electron 中的 Node 來處理
