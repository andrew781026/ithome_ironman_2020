# [ Day 37 ] - 當機報告 ( crashReporter )

當 Electron 應用程式遇到 `process.crash()` 時 , 會觸發 crashReporter 機制 , 將 .dmp 檔上傳到伺服器中

Crash reports are stored temporarily before being uploaded in a directory underneath the app's user data directory (called 'Crashpad' on Windows and Mac, or 'Crash Reports' on Linux). You can override this directory by calling app.setPath('crashDumps', '/path/to/crashes') before starting the crash reporter.

On Windows and macOS, Electron uses crashpad to monitor and report crashes. On Linux, Electron uses breakpad. This is an implementation detail driven by Chromium, and it may change in future. In particular, crashpad is newer and will likely eventually replace breakpad on all platforms.

---

crashReporter - 當機報告

```js
const { crashReporter } = require('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

## WinDbg 

Electron 遇到 process.crash() 時 , 會在 [%USER%]\AppData\Roaming\[%APP_NAME%]\Crashpad\reports 資料夾中 , 建立 .dmp 檔 ( 小型記憶體傾印檔案 ) 

需要利用 WinDbg 來查看 Windows 上的 crashReport 中的 .dmp 檔案 

不過 , 要如何看懂 .dmp 檔案呢 ? 

![](https://i.imgur.com/YZFDv6q.png)

## 參考資料

- [bugsplat](https://www.bugsplat.com/docs/sdk/electron/)
- [crashReporter](https://www.electronjs.org/docs/api/crash-reporter)
- [electron-crash-report-server](https://github.com/electron-in-action/electron-crash-report-server/blob/master/server.js)

```
今年小弟第一次參加 `鐵人賽` , 如文章有誤 , 請各位前輩提出指正 , 感謝  <(_ _)>
```
