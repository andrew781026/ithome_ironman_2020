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
